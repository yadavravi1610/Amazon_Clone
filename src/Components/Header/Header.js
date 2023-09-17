import React, { useState, useEffect, useRef } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { logo } from "../../assets/index"
import { Link } from 'react-router-dom';
import { setUserAuthentication, userSignOut, resetOrders, resetCancelOrders, resetReturnOrders } from '../../Redux/amazonSlice';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Pincode from './Pincode';
import { useLoaderData } from 'react-router-dom';
import SignInoptions from './SignInoptions';
import { useCart } from '../../context/userCartContext';
import LogoutIcon from '@mui/icons-material/Logout';



const Header = () => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const { cartTotalQty } = useCart();
    const product = useLoaderData();
    const productsData = product.data.products;
    var productCategories = [];
    productsData.forEach(product => {
        if (!productCategories.includes(product.category)) {
            productCategories.push(product.category);
        }
    });
    const [showAll, setShowAll] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const products = useSelector((state) => state.amazon.products);
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        let allQty = 0;
        products.forEach((product) => {
            allQty += product.quantity;
        });
        setQuantity(allQty);
    }, [products]);

    const ref = useRef();
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                setShowAll(false);
            }
        })
    }, [ref, showAll]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(userSignOut());
                dispatch(setUserAuthentication(false));
                dispatch(resetOrders());
                dispatch(resetCancelOrders());
                dispatch(resetReturnOrders());
            }).catch((error) => {
            });
    }
    return (<>
        <div className='w-full fixed z-50 top-0'>
            <div className='w-full bg-amazon_blue text-white px-2 py-2 flex items-center gap-1 xs:justify-evenly'>
                {/* amazon logo start */}
                <Link to='/'>
                    <div className='headerHover'>
                        <img className='sm:w-24 mt-2' src={logo} alt="logo" />
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
                            <div className='w-full h-screen text-black fixed top-3 left-1 bg-amazon_blue bg-opacity-0' >
                                <div ref={ref}>
                                    <ul className='absolute w-56 h-80 top-10 left-72 right-4 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-gray-300 text-black  flex-col gap-1 z-50'>
                                        {productCategories.map((category) => (
                                            <Link to={`${category}`}>
                                                <li key={category.id} className='text-sm tracking-wide font-semibold p-1 border-b-[1px] border-b-transparent hover:bg-blue-600 hover:text-white cursor-pointer duration-200 capitalize'>{category}</li>
                                            </Link>
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
                        {userInfo ? <p className='xs:text-xs md:text-xs lg:text-base font-medium'>Hello, {userInfo.name}</p> :
                            <p className='xs:text-xs md:text-xs lg:text-lg font-medium'>Hello, Sign in</p>}
                        <p className='text-xs mdl:text-base font-semibold -mt-1 text-whiteText hidden lg:inline-flex'>Accounts & Lists {""}<span><ArrowDropDownOutlinedIcon /></span>
                        </p>
                        {
                            showSignin &&
                            <div className='w-full h-screen text-black fixed top-16 left-0 bg-amazon_blue bg-opacity-50 flex justify-end'>
                                <div className='w-full absolute left-[40%] md:left-[45%] lgl:left-[60%]'>
                                    {
                                        userInfo ?
                                            <div onMouseLeave={() => setShowSignin(false)} onClick={(e) => e.preventDefault()} className='mdl:w-[50%] lgl:w-[32%] sml:w-[50%] mr-10 rounded-sm h-[96] overflow-hidden -mt-2 bg-white border border-transparent '>
                                                <SignInoptions />
                                                <div className='flex flex-col gap-1 text-xs lgl:text-sm font-normal items-start mt-3 ml-[53%] '>
                                                    <hr className='w-32' />
                                                    <h4 className='hover:text-orange-500 hover:underline'>Switch Accounts</h4>
                                                    <h4 className='hover:text-orange-500 hover:underline' onClick={handleLogout}>Sign Out</h4>
                                                </div>
                                            </div>
                                            :
                                            <div onMouseLeave={() => setShowSignin(false)} onClick={(e) => e.preventDefault()} className='mdl:w-[50%] lgl:w-[32%] sml:w-[50%] mr-10 rounded-sm  overflow-hidden sml:h-[60%] mdl:h-[55%] lg:h-[70%] lgl:h-[60%] -mt-2 bg-white border border-transparent '>
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
                                                <SignInoptions />
                                            </div>
                                    }
                                </div>
                            </div>

                        }

                    </div>
                </Link>
                {/* Signin end */}
                {/* Orders Start  */}
                <Link to={authenticated ? "/orders" : "/Login"}>
                    <div className='lgl:flex flex-col items-start justify-center headerHover'>
                        <p className='text-xs mdl:text-sm font-medium'>Returns</p>
                        <p className='text-xs mdl:text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
                    </div>
                </Link>
                {/* Orders End */}
                {/* Cart Start */}
                <Link to='/Cart'>
                    <div className='flex flex-row items-start justify-center headerHover pt-2 relative'>
                        <ShoppingCartOutlinedIcon />
                        <p className='text-xs font-semibold mt-3 text-whiteText'>
                            Cart <span className='absolute text-xs top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                                {cartTotalQty > 0 ? cartTotalQty : quantity}
                            </span>
                        </p>
                    </div>
                </Link>
                {/* Cart End  */}

                {/* Logout Start  */}
                {
                    userInfo && (
                        <div onClick={handleLogout} className="headerHover flex flex-col justify-center items-center relative">
                            <LogoutIcon />
                            <p className="hidden mdl:inline-flex text-sm font-bold">Logout</p>
                        </div>
                    )
                }

                {/* Logout End */}
            </div>

        </div>
    </>
    )
}

export default Header
