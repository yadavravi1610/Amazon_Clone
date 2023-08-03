import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { productsData } = props;
    return (
        productsData.map((product) => (
            <div className='w-96 my-5 rounded border-[1px] border-gray-200 shadow-none hover:shadow-testShadow duration-200' key={product.id}>
                <div className=" bg-gray-100 border-b-[1px] border-gray-200 flex justify-center items-center cursor-pointer relative group" >
                    <img className="w-full h-72" src={product.thumbnail} alt="productImage" />
                </div>
                <div className='p-2 '>
                    <Link to={`${product.title}`} >
                        <div>
                            <p className="text-lg font-medium cursor-pointer">{product.title}</p>
                        </div>
                    </Link>
                    <div className='my-3'>
                        <p>{product.description.substring(0, 50)}...</p>
                    </div>
                    <div className='flex items-center '>
                        <div className='ml-1 text-blue-500'>{product.rating}</div>
                    </div>
                    <div className='flex items-center mt-1'>
                        <p className='font-medium mb-1'>&nbsp;₹&nbsp;</p>
                        <span className='text-[26px] font-medium'>{product.price}</span>
                        <span>&nbsp;({product.discountPercentage}% Off)</span>
                    </div>
                    <button className={`text-lg font-medium w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                    >Add to Cart</button>
                </div>
            </div>
        ))
    )
}

export default Product
