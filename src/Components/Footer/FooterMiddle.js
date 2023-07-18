import React from 'react'
import FooterMiddlelist from './FooterMiddlelist'
import { middleList } from '../../constants'
import { logo } from '../../assets'


const FooterMiddle = () => {
    return (
        <div>
            <div className='bg-slate-700 hover:bg-slate-600 text-white h-10'>
                <div className='w-36 mx-auto text-sm py-2'>
                <a href='#'>Back to top</a>
                </div>
            </div>
            <div className='w-full bg-amazon_light text-white'>
                <div className='w-full border-b-[1px] border-gray-500 py-10'>
                    <div className='max-w-5xl mx-auto text-gray-50'>
                        <div className='w-full grid grid-cols-4 place-items-center items-start'>
                        {
                            middleList.map((item)=>(
                               <FooterMiddlelist key={item.id}
                               title={item.title}
                               listItem={item.listItem} /> 
                            ))
                        }
                        {/* <FooterMiddlelist /> */}
                        
                        </div>
                    </div>
                </div>
                <div className='w-full flex gap-6 items-center justify-center py-6'>
                        <div>
                            <img className='w-20 pt-3' src={logo} />
                        </div>
                        <div className='flex gap-2'>
                            <p className='flex gap-1 items-center justify-center rounded-sm border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 text-sm py-1'>English</p>
                        </div>
            </div>
            </div>
           
        </div>
        
    )
}

export default FooterMiddle
