import React from 'react';
import { categoryData } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        navigate(`/${category}`); 
    };
    return (
        <div className='max-w-screen-2xl mb-10 flex flex-row flex-wrap items-center justify-center gap-10 relative'>
            {
                categoryData.map((item) => (
                    <div key={item.id} className='w-80 bg-white border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 flex flex-col gap-4' >
                        <div className='text-2xl ml-2 font-semibold tracking-wide'>{item.plot}</div>
                        {
                            item.subcategories ?
                                <div className='w-64 mx-auto flex  flex-row flex-wrap gap-3  justify-between'>
                                    {item.subcategories.map((item, index) => (
                                        <div key={index} className='group cursor-pointer' onClick={() => handleCategoryClick(item.category)} >
                                            <img className='w-24 h-36' src={item.img} alt='img' />
                                            <h4 className='text-xs font-semibold mx-auto mt-1 mb-2 group-hover:text-red-400'>{item.title}</h4>
                                        </div>
                                    ))}
                                </div>
                                :
                                    <div className='group cursor-pointer' onClick={() => handleCategoryClick(item.category)}>
                                        <div className='w-72 h-72 mx-auto'>
                                            <img className='w-72 h-72' src={item.img} alt='Product' />
                                        </div>
                                        <p className='font-semibold ml-5 mt-4 mb-2'>{item.title}</p>
                      
                                        <p className='text-cyan-700 text-sm font-medium ml-[20px] group-hover:text-red-400'>See more</p>
                                    </div>
                        }

                    </div>
                ))
            }
        </div>
    )
}

export default Category
