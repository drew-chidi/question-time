
import { useState } from 'react';
import { getToken } from '../utils/api';

const TokenPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTokenRequest = async () => {
        setLoading(true);
        try {
            await getToken(email);
            // Redirect to main page after successful token retrieval
            // You can use Next.js Router for client-side navigation
        } catch (error) {
            console.error('Error retrieving token:', error);
            // Handle error (e.g., display error message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Retrieve Token</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleTokenRequest} disabled={loading}>
                {loading ? 'Loading...' : 'Retrieve Token'}
            </button>
        </div>
    );
};

export default TokenPage;
