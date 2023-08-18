import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { emptyCart } from '../assets/index';
import { deleteProduct, increaseQuantity, decreaseQuantity } from '../Redux/amazonSlice';
import { Link, useLoaderData } from 'react-router-dom';
import { resetCart } from '../Redux/amazonSlice';

const Cart = () => {
    const [showText, setShowText] = useState(false);
    const dispatch = useDispatch();
    const list = useLoaderData();
    const productsList = list.data.products;
    const products = useSelector((state) => state.amazon.products);
    // console.log("Cart", products);
    const [totalPrice, setTotalPrice] = useState('');
    const ref = useRef();
    const [increaseheight, setIncreaseHeight]= useState(0);
    const [totalQuantity, setTotalQuantity] = useState('');
    useEffect(() => {
        var Total = 0;
        var quantity = 0;
        products.map((item) => {
            Total += item.price * item.quantity
            quantity += item.quantity;
            return setTotalPrice(Total)
        })
        setTotalQuantity(quantity)
    }, [products]);

    useEffect(()=>{
        const updateHeight = ()=>{
           if(ref.current){
            const productHeight = ref.current.clientHeight;
            console.log(productHeight);
            const cartHeight = productHeight + 5;
            setIncreaseHeight(cartHeight);
        } 
        }
        updateHeight();
        
    },[products])

    return (
        <div className='w-full h-auto min-h-[20rem] bg-gray-100 p-4'>
            {products.length === 0 ?
                <div className='w-full h-full'>
                    <div className=' flex sml:flex-col lgl:flex-row justify-center p-2'>
                        <img src={emptyCart} alt='' />
                        <div className='lgl:w-[30%] h-auto bg-white my-4  rounded-md'>
                            <p className='text-xl pl-[20%] font-bold mt-4'>Your Cart feels lonely.</p>
                            <p className='tracking-tight pl-[10%]'>Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
                            <Link to='/'>
                                <button className='w-[90%] mx-4 font-semibold mb-5 bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>Continue Shopping</button></Link>
                        </div>
                    </div>
                </div>
                : 
            
                <div  className='bg-gray-100 grid sml:flex-col lgl:grid-cols-5  gap-5'>
                    <div className='w-full h-auto px-3 bg-white  lgl:col-span-4'>
                        <div className='py-2 flex justify-between items-end border-b-[1px] border-b-gray-200'>
                            <p className='font-semibold text-3xl'>Shopping Cart</p>
                        </div>
                        <div ref={ref} className='w-full flex flex-col gap-5 p-3'>
                            {
                                products.map((item, index) => (
                                    <div key={index} className='border-b-[1px] border-b-gray-200 pb-3 flex flex-row'>
                                        <img className='w-36' key={item.id} src={item.thumbnail} alt='my' />
                                        <div className='p-3 flex flex-col gap-1'>
                                            <h1 className='font-semibold'>{item.title}</h1>
                                            <h1>{item.description.substring(0, 60)}...</h1>
                                            <h1>&#8377;{item.price}</h1>
                                            <h1 className='text-green-700 text-xs pt-2'>In Stock</h1>
                                            <h1>
                                                {/* Qty:{item.quantity} */}
                                                <div className='flex items-center justify-start  '>
                                                    Qty :&nbsp;&nbsp;
                                                    <p onClick={() => dispatch(decreaseQuantity(item.title))} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>-</p>
                                                    <p className='font-semibold text-[20px]'>&nbsp;{item.quantity}&nbsp;</p>
                                                    <p onClick={() => dispatch(increaseQuantity(item.title))} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>+</p>
                                                </div>
                                                <button onClick={() => dispatch(deleteProduct({ id: item.id }))} className='text-xs pl-3 cursor-pointer hover:underline text-green-700'>Delete</button>
                                            </h1>
                                        </div>
                                    </div>
                                ))}
                        </div>


                        <div className='w-full mb-3 font-medium h-auto justify-between flex gap-1 items-center'>
                            <button onClick={() => dispatch(resetCart())} className='w-24 mx-4 font-medium bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 text-xs duration-200 py-1.5 rounded-md mt-3'>Clear Cart</button>
                            <p className=''>Subtotal
                                <span>({totalQuantity} items):&#8377;{totalPrice}</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='w-full h-auto bg-white'>
                            <div className='text-green-700 flex gap-2 my-4'>
                                <p><CheckCircleIcon /></p>
                                <span className='text-xs tracking-wide font-medium leading-3'>Part of your order qualifies for FREE Delivery. Select this option at checkout. Details</span>
                            </div>
                            <div className='w-full font-medium text-xl h-auto justify-center flex gap-1 items-end'>
                                <p>Subtotal </p>
                                <span>({totalQuantity} items):&#8377;{totalPrice}</span>
                            </div>
                            <button className='w-[90%] mx-4 font-medium bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 text-xs duration-200 py-1.5 rounded-md mt-3'>Proceed to Buy</button>
                            <div onClick={() => setShowText(!showText)} className='w-[87%] my-4 mx-auto border flex relative border-gray-300 rounded-b-md'>
                                <p className='p-2 ml-4 text-xs flex justify-between'>EMI Available</p>
                                {
                                    showText ? <span className=' lgl:pl-[70%] lgl:absolute'><KeyboardArrowUpIcon /></span> : <span className='pl-[70%] lgl:absolute'><KeyboardArrowDownIcon /></span>
                                }
                                {
                                    showText &&
                                    <p className='text-sm lgl:pt-8'>Your order qualifies for EMI with valid credit cards (not available on purchase of Gold, Jewelry, Gift cards and Amazon pay balance top up). <span className='text-green-800 font-medium'>Learn more</span></p>
                                }

                            </div>
                        </div>

                        <div className='w-full h-auto bg-white'>
                            <p>Customers who bought other items</p>
                            <div style={{height:increaseheight}} className='bg-white flex flex-col gap-4 py-3 ml-3 custom-scrollbar overflow-y-hidden hover:overflow-y-scroll'>
                                {productsList.map((product, index) => (
                                    <div className='flex flex-row gap-2' key={index} >
                                        <Link to={`/allProducts/${product.title}`}>
                                            <img className='w-20 h-20' src={product.thumbnail} alt="productImage" />
                                        </Link>
                                        <div className=''>
                                            <Link to={`/${product.category}/${product.title}`}>
                                                <p className='text-blue-600 text-xl font-semibold'>{product.title.substring(0, 15)}</p>
                                            </Link>
                                            <p className='text-red-600 text-[20px] font-semibold mt-2'>₹ {product.price}.00</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>

    )
}

export default Cart


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { ScrollRestoration } from 'react-router-dom';
// import EmptyCart from './emptyCart';
// import CartItems from './cartItems.js';
// // import { useCart } from '../context/userCartContext';

// const Cart = () => {
//     // Get the list of products from the Redux store
//     const products = useSelector((state) => state.amazon.products);

//     // Use the useCart hook to access the userCart data
//     // const { userCart } = useCart();

//     return (
//         <div className='flex gap-5 w-full h-full bg-gray-200 '>
//             <ScrollRestoration />
//              {/* Check if there are products in the Redux store or user Firebasecart */}
//             {
//                 products.length > 0
//                     ? (<CartItems />)
//                     : (<EmptyCart />)
//             }
//         </div>
//     )
// }

// export default Cart;
