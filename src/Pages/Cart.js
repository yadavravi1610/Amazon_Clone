import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { emptyCart } from '../assets';
import { removeFromCart } from '../Redux/amazonSlice';
import { Link } from 'react-router-dom';
import { clearCart } from '../Redux/amazonSlice';

const Cart = () => {
  const [showText, setShowText] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazonReducer.products);
  const [totalPrice, setTotalPrice] = useState('');
  useEffect(() => {
    var Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity
      return setTotalPrice(Total)
    })
  }, [products]);
  // console.log("Cart", products);
  
  return (
    <div className='w-full h-auto min-h-[20rem] bg-gray-100 p-4'>
      {products.length === 0 ?
        <div className='w-full h-full'>
          <p className=' flex flex-row justify-center p-2'>
            <img src={emptyCart} alt='' />
            <div className='w-[30%] h-auto bg-white my-4  rounded-md'>
                  <p className='text-xl pl-[20%] font-bold mt-4'>Your Cart feels lonely.</p>
                  <p className='tracking-tight pl-[10%]'>Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
                  <Link to='/'>
                  <button className='w-[90%] mx-4 font-semibold mb-5 bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>Continue Shopping</button></Link>
            </div>
          </p>
        </div> :
        <div className='bg-gray-100 grid mdl:grid-cols-5 grid-cols-4 gap-5'>
          <div className='w-full h-auto px-3 bg-white mdl:col-span-4 col-span-3'>
            <div className='py-2 flex justify-between items-end border-b-[1px] border-b-gray-200'>
              <p className='font-semibold text-3xl'>Shopping Cart</p>
            </div>
            <div className='w-full flex flex-col gap-5 p-3'>
              {
                products.map((item) => (
                  <div className='border-b-[1px] border-b-gray-200 pb-3 flex flex-row'>
                    <img className='w-32' key={item.id} src={item.image} alt='' />
                    <div className='p-3 flex flex-col gap-1'>
                      <h1 className='font-semibold'>{item.title}</h1>
                      <h1>{item.description.substring(0, 60)}...</h1>
                      <h1>&#8377;{item.price}</h1>
                      <h1 className='text-green-700 text-xs pt-2'>In Stock</h1>
                      <h1>
                        Qty:{item.quantity}
                        <button onClick={()=>dispatch(removeFromCart({id:item.id}))} className='text-xs pl-3 cursor-pointer hover:underline text-green-700'>Delete</button>
                      </h1>
                    </div>
                  </div>
                ))}
            </div>


            <div className='w-full mb-3 font-medium h-auto justify-between flex gap-1 items-center'>
              <button onClick={()=>dispatch(clearCart())} className='w-24 mx-4 font-medium bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 text-xs duration-200 py-1.5 rounded-md mt-3'>Clear Cart</button>
              <p className=''>Subtotal 
              <span>({products.length} items):&#8377;{totalPrice}</span>
              </p>
            </div>
          </div>
          <div className='w-full bg-white'>
            <p className='text-green-700 flex gap-2 my-4'>
              <p><CheckCircleIcon /></p>
              <span className='text-xs tracking-wide font-medium leading-3'>Part of your order qualifies for FREE Delivery. Select this option at checkout. Details</span>
            </p>
            <div className='w-full font-medium text-xl h-auto justify-center flex gap-1 items-end'>
              <p>Subtotal </p>
              <span>({products.length} items):&#8377;{totalPrice}</span>
            </div>
            <button className='w-[90%] mx-4 font-medium bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 text-xs duration-200 py-1.5 rounded-md mt-3'>Proceed to Buy</button>
            <div onClick={() => setShowText(!showText)} className='w-[87%] my-4 mx-auto border border-gray-300 rounded-b-md'>
              <p className='p-2 ml-4 text-xs'>EMI Available
                {
                  showText ? <span className='pl-[50%]'><KeyboardArrowUpIcon /></span> : <span className='pl-[50%]'><KeyboardArrowDownIcon /></span>
                }
                {
                  showText &&
                  <p className='text-sm'>Your order qualifies for EMI with valid credit cards (not available on purchase of Gold, Jewelry, Gift cards and Amazon pay balance top up). <span className='text-green-800 font-medium'>Learn more</span></p>
                }
              </p>
            </div>
          </div>

        </div>
      }
    </div>

  )
}

export default Cart
