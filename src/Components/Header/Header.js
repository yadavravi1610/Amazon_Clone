import React, { useState, useEffect, useRef } from 'react'
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { logo } from "../../assets/index"
import { allItems } from '../../constants';
import { Link } from 'react-router-dom';
import { userSignOut } from '../../Redux/amazonSlice';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Pincode from './pincode';

// import { useParams } from 'react-router-dom';


const Header = () => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const [showAll, setShowAll] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const products = useSelector((state) => state.amazon.products);
    const userInfo = useSelector((state) => state.amazon.userInfo);

    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        let quan = 0;
        products.map((item)=>{
            return setQuantity(quan+=item.quantity);
        })
    },[products])

    // console.log(products);
    const ref = useRef();
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                setShowAll(false);
            }
            // console.log(e.target.contains(ref.current));
            
        })
    }, [ref, showAll]);

    const handleLogout= (e) => 
    { 
        e.preventDefault();  
        signOut(auth).then(() => {
            dispatch(userSignOut());
          }).catch((error) => {
            // An error happened.
          });
    }
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
                <Pincode />
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
                    <p className='flex'><img src='https://cdn-icons-png.flaticon.com/128/206/206606.png' alt='flag' className='w-[18px] mt-2 h-6' />
                        <span className='pl-1 pt-[11px] font-bold text-sm'>EN</span>
                        <span className='pt-2'><ArrowDropDownIcon /></span></p>
                </div>
                {/* Language End */}
                {/* Signin Start  */}
                <Link to='/Login'>
                    <div className='flex flex-col items-start justify-center headerHover' onMouseEnter={() => setShowSignin(true)} onMouseLeave={() => setShowSignin(false)}>
                        {userInfo ? <p className='xs:text-sm md:text-sm font-medium'>{userInfo.username}</p> :
                            <p className='xs:text-sm md:text-xs font-medium'>Hello, Sign in</p>}
                        <p className='text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex'>Accounts & Lists {""}<span><ArrowDropDownOutlinedIcon /></span>
                        </p>
                        {
                            showSignin && <div className='w-full h-screen text-black fixed top-16 left-0 bg-amazon_blue bg-opacity-50 flex justify-end'>
                                <div onMouseLeave={() => setShowSignin(false)} onClick={(e)=>e.preventDefault()} className='mdl:w-[50%] lgl:w-[40%] sml:w-[50%] mr-10 rounded-sm sml:h-[50%] mdl:h-[70%] overflow-hidden   -mt-2 bg-white border border-transparent '>
                                    {
                                        userInfo ?
                                            <div className='grid grid-cols-2 mt-1 ml-8 pt-2 '>
                                                <div className='flex flex-col gap-2'>
                                                    <h3 className='font-medium text-sm mdl:text-lg lgl:text-xl'>Your Lists</h3>
                                                    <ul className='text-xs mdl:text-sm lgl:text-lg font-normal flex flex-col gap-2'>
                                                        <li className='hover:text-orange-500 hover:underline'>Shopping List</li>
                                                        <hr className='w-[80%]' />
                                                        <li className='hover:text-orange-500 hover:underline'>Create a WishList</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Wish from Any Website</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Baby Wishlist</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Discover Your Style</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Explore Showroom</li>
                                                    </ul>
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <h3 className='font-medium text-sm mdl:text-lg lgl:text-xl'>Your Account</h3>
                                                    <ul className='text-xs mdl:text-sm lgl:text-lg font-normal flex flex-col lgl:gap-1'>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Account</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Orders</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Wishlist</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Recommendations</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Prime Membership</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Prime Video</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Subscribe & Save Items</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Memberships & Subscriptions</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Seller Account</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Manage Your Content and Devices</li>
                                                        <li className='hover:text-orange-500 hover:underline'>Your Free Amazon Business Account</li>
                                                        <hr />
                                                        <li className='hover:text-orange-500 hover:underline'>Switch Accounts</li>
                                                        <li className='hover:text-orange-500 hover:underline' onClick={handleLogout}>Sign Out</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : <div>
                                                <div className='flex flex-col justify-center gap-1 mb-2 mt-5 text-center'>
                                                    <Link to="/Login">
                                                        <button className='w-60 h-8 text-sm bg-yellow-400 rounded-md py-1 font-semibold cursor-pointer'>
                                                            Sign in
                                                        </button>
                                                    </Link>
                                                    <p className='text-xs'>New Customer?{""}
                                                        <Link to='/SignUp'><span className='text-green-600 ml-1 cursor-pointer hover:text-orange-500 hover:underline'>Start here.</span></Link>
                                                    </p>
                                                </div>
                                                <hr className='w-[80%] mx-auto' />
                                                <div className='grid grid-cols-2 mt-1 ml-8'>
                                                    <div className='flex flex-col gap-2'>
                                                        <h3 className='font-medium text-xs mdl:text-sm lgl:text-lg'>Your Lists</h3>
                                                        <ul className='text-xs lgl:text-sm font-normal flex flex-col gap-3 '>
                                                            <li className='hover:text-orange-500 hover:underline'>Shopping List</li>
                                                            <hr className='w-[80%]' />
                                                            <li className='hover:text-orange-500 hover:underline'>Create a WishList</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Wish from Any Website</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Baby Wishlist</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Discover Your Style</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Explore Showroom</li>
                                                        </ul>
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <h3 className='font-medium text-xs mdl:text-sm lgl:text-lg'>Your Account</h3>
                                                        <ul className='text-xs lgl:text-sm font-normal flex flex-col gap-3'>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Account</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Orders</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Wishlist</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Recommendations</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Prime Membership</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Prime Video</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Subscribe & Save Items</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Memberships & Subscriptions</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Seller Account</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Manage Your Content and Devices</li>
                                                            <li className='hover:text-orange-500 hover:underline'>Your Free Amazon Business Account</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        }

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
                                {products.length>0 ? quantity: 0}
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
