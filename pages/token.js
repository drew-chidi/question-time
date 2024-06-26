
import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { getToken } from '@/utils/api';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TokenPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleTokenRequest = async (e) => {
        setLoading(true);
        try {
            let response = await getToken(email);
            if (response) {
                router.push('/');
            }
            setEmail('')
        } catch (error) {
            toast.error('Error retrieving token:', error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-[375px] sm:max-w-md  m-auto
        p-4 mt-16">
            <div className='grid grid-col-4 gap-4'>
                <h1 className='text-xl sm:text-2xl'>Retrieve Your Token</h1>
                <div className='mt-8'>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <Button onClick={handleTokenRequest} disabled={loading} className={'bg-blue-800'}>
                    {loading ? 'Loading...' : 'Retrieve Token'}
                </Button>
            </div>
        </Card>
    );
};

export default TokenPage;
