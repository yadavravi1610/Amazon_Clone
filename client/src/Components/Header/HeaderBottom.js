import React, { useRef, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import SideNavContent from './SideNavContent';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useLoaderData } from 'react-router-dom';
import { setUserAuthentication, userSignOut} from '../../Redux/amazonSlice';


const HeaderBottom = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const product = useLoaderData();
  const productsData = product.data.products;
  var productCategories = [];
  productsData.forEach(product => {
    if (!productCategories.includes(product.category)) {
      productCategories.push(product.category);
    }
  });
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();
  const [sidebar, setSideBar] = useState(false);
  // console.log(sidebar);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSideBar(false);
      }
      // console.log(e.target.contains(ref.current));
    })
  }, [ref, sidebar])

  const handleLogout = () => {
    // e.preventDefault();
    signOut(auth)
    .then(() => {
        dispatch(userSignOut());
        dispatch(setUserAuthentication(false));

    }).catch((error) => {
        // An error happened.
    });
}
  return (
    <div className='w-full mt-16 px-2 h-[36px] bg-amazon_light text-white flex items-center'>
      {/* Items start  */}
      <ul className='flex items-center gap-2 mdl:text-sm tracking-wide xs:text-xs'>
        <li onClick={() => setSideBar(true)} className='headerHover h-8 mt-1 flex items-center gap-1'><MenuIcon />All</li>
        <li className='headerHover h-8 mt-1'>Amazon miniTV</li>
        <li className='headerHover h-8 mt-1'>Sell</li>
        <li className='headerHover h-8 mt-1'>Best Seller</li>
        <li className='headerHover h-8 mt-1'>Today's Deals</li>
        <Link to="/Smartphones" ><li className='headerHover h-8 mt-1'>Mobiles</li></Link>
        <li className='headerHover h-8 mt-1'>New Releases</li>
      </ul>
      {/* items end  */}
      {/* SideNavContent Start  */}
      {sidebar && (
        <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50 flex'>

          <motion.div ref={ref} initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .5 }} className='mdl:w-[30%] lgl:w-[20%] sml:w-[50%] overflow-y-scroll h-full bg-white border border-black'>
            <div className='w-full bg-amazon_light sticky top-0 left-0 text-white py-2 px-6 flex items-center gap-4'>
              {
                userInfo ? <img src={userInfo.image} className='w-10 h-10 rounded-full' alt='user' /> : <AccountCircleIcon />
              }

              {
                userInfo ? <h3>Hello,{userInfo.name}</h3> :
                  <Link to="/Login" >
                    <h3>Hello, Sign In</h3>
                  </Link>
              }

            </div>
            <h1 className='text-xl font-semibold py-3'>Categories</h1>
            <hr className='py-1' />
            <div ref={ref}>
              <ul className='flex flex-col ml-3 justify-between py-2 cursor-pointer'>
                {productCategories.map((category) => (
                  <Link to={`${category}`}>
                    <li key={category.id} className='text-lg tracking-wide font-normal p-1 border-b-[1px] border-b-transparent hover:bg-zinc-200 cursor-pointer duration-200 capitalize'>{category}</li>
                  </Link>
                ))}
              </ul>
            </div>
            <hr className='py-1' />
            {
              userInfo ?
               <h4 onClick={handleLogout} className='hover:text-orange-500 pb-4 ml-3 text-lg font-normal cursor-pointer'>Sign Out</h4>: <h4></h4>
            }
            
          </motion.div>
          <div onClick={() => setSideBar(false)} className='w-10 absolute cursor-pointer h-10 mdl:ml-[31%] lgl:ml-[21%] sml:ml-[51%] text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'><CloseIcon />
          </div>

        </div>
      )}

      {/* SideNavContent End */}
    </div>
  )
}

export default HeaderBottom
