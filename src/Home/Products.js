import React from 'react';
import { useLoaderData } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const Products = () => {
  const data = useLoaderData();
  const productsData = data.data;
  console.log(productsData);
  return (
    <div className='max-w-screen-2xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10 px-4'>{
      productsData.map((item)=>(
        <div key={item.id} className='bg-white h-auto border-[1px] border-gray-200 py-6 z-20 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex flex-col gap-4 relative'>
        <div className='w-full h-auto flex items-center justify-center'>
            <img className='w-52 h-64 object-contain' src={item.image} alt='Product'/>
        </div>
            <div className='px-4 flex items-center justify-between'>
                <h2 className='tracking-wide text-lg text-amazon_blue font-medium'>{item.title.substring(0,20)}
                <p className='text-sm text-gray-600 font-semibold'>&#8377;{item.price}</p>
                </h2>
            </div>
            <div>
              <p className='text-sm px-4'>{item.description.substring(0,40 )}...</p>
              <div className='px-4 text-yellow-500'>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <button className='w-[90%] mx-4 font-medium bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>Add to Cart</button>
            </div>
        </div>
      ))
    }
    </div>
  )
}

export default Products;