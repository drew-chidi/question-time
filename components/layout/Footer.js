import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className=' flex-none border-t mt-10 p-8 flex gap-10 justify-center'>
            <div className='flex gap-3 items-center '>
                <div className='flex gap-1 items-center'>

                    <Copyright className='w-4 h-4' />
                    <p>2024</p>
                </div>
                <span>Question Time.</span>
                <p>All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer