import React from 'react';
import { useCart } from '../context/userCartContext';
import ProductsSlider from '../Home/productSlider';

const OrderDetails = () => {

    const { userCart } = useCart();
    // console.log(userCart);

    return (
        <div className='w-full relative my-6 flex flex-col gap-5 bg-white left-[10%]'>
            <div className='w-full h-10'>
                <p className='font-semibold text-2xl'>Your Orders</p>
            </div>
            {
                userCart.length > 0 ?
                    <div>
                        {
                            userCart.map((product, index) => (
                                <div className='w-[80%] border h-auto rounded-md mb-5 flex flex-col'>
                                    <div className='w-full flex flex-row flex-wrap gap-5 justify-between py-3 bg-gray-100 border-b-[1px]'>
                                        <div className='flex flex-wrap gap-5 px-5'>
                                            <div className='w-auto text-xs h-auto'>
                                                <p>ORDER PLACED</p>
                                                <p className='font-semibold'>
                                                    12 September 2023
                                                </p>
                                            </div>
                                            <div className='w-auto text-xs h-auto'>
                                                <p>TOTAL</p>
                                                <p className='font-semibold'>
                                                    ₹{product.price}
                                                </p>
                                            </div>
                                            <div className='w-auto text-xs h-auto'>
                                                <p>SHIP TO</p>
                                                <p className='font-semibold text-blue-400'>
                                                    Ravinder Yadav
                                                </p>
                                            </div>
                                        </div>
                                        <div className='px-5'>
                                            <div className='w-full h-auto text-xs'>
                                                <p>ORDER id</p>
                                            </div>
                                            <div className='flex gap-5 text-xs text-blue-400'>
                                                <p>View order details</p>
                                                <p>Invoice</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full h-auto my-4 '>
                                        <div className='w-auto h-auto flex justify-between items-center flex-row gap-5 flex-wrap'>
                                            <div className='px-4 flex flex-col gap-3'>
                                                <p className='font-semibold text-lg'>Arriving in 2 days</p>
                                                <div className='w-auto h-auto flex flex-wrap gap-5'>
                                                    <img className='w-24 h-24' src={product.thumbnail} alt='order' />
                                                    <p className='text-blue-400'>{product.title}</p>
                                                </div>
                                            </div>
                                            <div className='px-5'>
                                                <button className={`pt-2 w-full cursor-not-allowed text-center rounded-2xl bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
                                                    Track package
                                                </button>
                                                <button className={`pt-2 w-full cursor-not-allowed text-center rounded-2xl hover:bg-gray-50 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
                                                    view or edit order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    : <div>
                        <div className='flex items-center mx-[10%] mdl:mx-[30%]'>
                            Looks like you haven't placed an order yet.
                        </div>
                        <div className='w-[80%]'>
                            <ProductsSlider />
                            </div>
                    </div>

            }

        </div>
    )
}

export default OrderDetails
