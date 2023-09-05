import React from 'react'
import { useSelector } from 'react-redux';
import EmptyCart from './emptyCart';
import { useCart } from '../context/userCartContext';
import CartItems from './cartItems';

const Cart = () => {
    const products = useSelector((state) => state.amazon.products);

    const {userCart} = useCart();

    return (
        <div className='w-full h-auto min-h-[20rem] bg-gray-100 p-4'>
            {products.length > 0 || userCart.length >0 ?
                <CartItems />
                : 
                <EmptyCart />
            }
        </div>

    )
}

export default Cart



