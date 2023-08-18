import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function SideNavContent({title, one, two, three}) {
    return (
        <div>
            <div className='py-3 border-b-[1px] border-b-gray-300'>
                <h3 className='text-lg font-titleFont font-semibold mb-1 px-6'>{title}</h3>
                <ul className='text-sm'>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        {one}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        {two}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        {three}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                </ul>
            </div>
            {/* <div className='py-3 border-b-[1px] border-b-gray-300'>
            <h3 className='text-lg font-titleFont font-semibold mb-1 px-6'>Digital Content And Devices</h3>
            <ul>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Echo & Alexa{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Fire TV{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Kindle E-Readers & Books{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Audible Audiobooks{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Amazon Prime Video{""}
                        <span>
                            <KeyboardArrowRightIcon />
                         </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Amazon Prime Music{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                </ul>
            </div>
            <div className='py-3 border-b-[1px] border-b-gray-300'>
            <h3 className='text-lg font-titleFont font-semibold mb-1 px-6'>Shop By Category</h3>
            <ul>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Mobiles, Computers{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        TV, Appliances, Electronics{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Men's Fashion{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        Women's Fashion{""}
                        <span>
                            <KeyboardArrowRightIcon />
                        </span>
                    </li>
                    <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                        See All
                        <span>
                            <KeyboardArrowDownIcon />
                        </span>
                    </li>
                    
                </ul>
            </div> */}
        </div>
    )
}

