import React from 'react'

const SignInoptions = () => {
    return (
        <div className='grid grid-cols-2 mt-1 ml-8'>
            <div className='flex flex-col gap-2 '>
                <h3 className='font-medium text-xs mdl:text-sm lgl:text-lg'>Your Lists</h3>
                <ul className='text-xs lgl:text-sm font-normal flex flex-col gap-3 '>
                    <li className='hover:text-orange-500 hover:underline'>Shopping List</li>
                    <hr className='w-[80%]' />
                    <li className='hover:text-orange-500 hover:underline'>Create a WishList</li>
                    <li className='hover:text-orange-500 hover:underline'>Wish from Any Website</li>
                    <li className='hover:text-orange-500 hover:underline'>Baby Wishlist</li>
                    <li className='hover:text-orange-500 hover:underline'>Discover Your Style</li>
                    <li className='hover:text-orange-500 hover:underline'>Explore Showroom</li>
                </ul>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-medium text-xs mdl:text-sm lgl:text-lg'>Your Account</h3>
                <ul className='text-xs lgl:text-sm font-normal flex flex-col gap-2'>
                    <li className='hover:text-orange-500 hover:underline'>Your Account</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Orders</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Wishlist</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Recommendations</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Prime Membership</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Prime Video</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Subscribe & Save Items</li>
                    <li className='hover:text-orange-500 hover:underline'>Memberships & Subscriptions</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Seller Account</li>
                    <li className='hover:text-orange-500 hover:underline'>Manage Your Content and Devices</li>
                    <li className='hover:text-orange-500 hover:underline'>Your Free Amazon Business Account</li>
                </ul>
            </div>
        </div>
    )
}

export default SignInoptions
