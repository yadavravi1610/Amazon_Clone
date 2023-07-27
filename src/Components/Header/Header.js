import React, { useState, useEffect, useRef } from 'react'
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { location } from '../../assets/index';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { logo } from "../../assets/index"
import { allItems } from '../../constants';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
    const [showAll, setShowAll] = useState(false);
    const products = useSelector((state) => state.amazon.products);
    console.log(products);
    const ref = useRef();
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                setShowAll(false);
            }
            // console.log(e.target.contains(ref.current));
        })
    }, [ref, showAll])
    return (<>
        <div className='w-full fixed z-50 top-0'>
            <div className='w-full bg-amazon_blue text-white px-2 py-2 flex items-center gap-1 xs:justify-evenly'>
                {/* amazon logo start */}
                <Link to='/'>
                    <div className='headerHover'>
                        <img className='w-24 mt-2' src={logo} alt="logo" />
                    </div>
                </Link>
                {/* amazon_logo end */}
                {/* Address Start  */}
                <div className='headerHover hidden mdl:inline-flex'>
                    <img className='pt-2' alt='' src={location} />
                    <p className='text-xs pl-1 text-lightText font-light flex flex-col leading-4'>
                        Deliver to <span className='text-sm font-semibold -mt-1 text-whiteText'>Select your address</span>
                    </p>
                </div>
                {/* Address End */}
                {/* search start  */}
                <div className='h-10 rounded-md hidden mdl:flex flex-grow relative'>
                    <span onClick={() => setShowAll(!showAll)} className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md hover:border-amazon_yellow'>
                        All<span></span>
                        <ArrowDropDownOutlinedIcon />
                    </span>
                    {
                        showAll && (
                            <div className='w-full h-screen text-black fixed top-1 left-4 bg-amazon_blue bg-opacity-0' >
                                <div ref={ref}>
                                    <ul className='absolute w-56 h-80 top-10 left-72 right-4 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-gray-300 text-black  flex-col gap-1 z-50'>
                                        {allItems.map((item) => (
                                            <li key={item.id} className='text-sm tracking-wide font-semibold p-1 border-b-[1px] border-b-transparent hover:bg-blue-600 hover:text-white cursor-pointer duration-200'>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    <input className='h-full text-base text-amazon_blue flex-grow outline-none border-none px-2' type='text' placeholder='Search Amazon.in' />

                    <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
                        <SearchIcon />
                    </span>
                </div>
                {/* search end  */}
                {/* Language Start */}
                <div className='headerHover hidden sml:inline-flex'>
                    <p className='flex'><img src='https://cdn-icons-png.flaticon.com/128/206/206606.png' alt='' className='w-[18px] mt-2 h-6' />
                        <span className='pl-1 pt-[11px] font-bold text-sm'>EN</span>
                        <span className='pt-2'><ArrowDropDownIcon /></span></p>
                </div>
                {/* Language End */}
                {/* Signin Start  */}
                <Link to='/Login'>
                    <div className='flex flex-col items-start justify-center headerHover'>
                        <p className='xs:text-sm md:text-xs font-medium'>Hello, Sign in</p>
                        <p className='text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex'>Accounts & Lists {""}                                           <span><ArrowDropDownOutlinedIcon /></span>
                        </p>
                    </div>
                </Link>
                {/* Signin end */}
                {/* Orders Start  */}
                <div className='hidden lgl:flex flex-col items-start justify-center headerHover'>
                    <p className='text-xs font-medium'>Returns</p>
                    <p className='text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
                </div>
                {/* Orders End */}
                {/* Cart Start */}
                <Link to='/Cart'>
                    <div className='flex flex-row items-start justify-center headerHover pt-2 relative'>
                        <ShoppingCartOutlinedIcon />
                        <p className='text-xs font-semibold mt-3 text-whiteText'>
                            Cart <span className='absolute text-xs top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                                {products.length > 0 ? products.length : 0}
                                </span>
                        </p>
                    </div>
                </Link>
                {/* Cart End  */}
            </div>

        </div>
    </>
    )
}

export default Header
