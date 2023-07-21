import React from 'react';
import { info } from '../../assets';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const SignUp = () => {
    return (
        <div className='w-full h-auto'>
            <Link to='/'><img className='m-auto w-52' src="https://api.freelogodesign.org/assets/blog/img/20180911090509731amazon_logo_RGB.jpg" />
            </Link>
            <div className="border border-1 border-gray-300 w-96 rounded-md m-auto h-auto px-4 py-4">
                <span className='text-3xl font-normal'>Create Account</span>
                <form className='mt-3 text-xs font-bold mb-4 flex flex-col gap-4'>
                    <p className='flex flex-col gap-1'>Your Name
                        <input type='text' className='border border-gray-400 rounded-sm h-7 font-normal p-2' placeholder='First and Last Name' />
                    </p>
                    <p className='flex flex-col gap-1'>Mobile number
                        <span>
                            <select className='font-medium rounded-sm border border-gray-400 h-7'>
                                <option>IN +91</option>
                            </select>
                            <input type='text' className='ml-4 border border-gray-400 h-7 w-[78%] rounded-sm font-normal p-2' placeholder='Mobile Number' />
                        </span>
                    </p>
                    <p className='flex flex-col'>Email (optional)
                        <input type='email' className='border border-gray-400 rounded-sm h-7 font-normal p-2' />
                    </p>
                    <p className='flex flex-col'>Password
                        <input type='password' className='border border-gray-400 rounded-sm h-7 font-normal p-2' placeholder='At least 6 characters' />
                        <span className='flex'>
                            <img className='w-3' src={info} />
                            <p className='pl-1 font-normal'>Password must be atleast 6 characters.</p>
                        </span>
                        <p className='mt-4 font-normal text-sm'>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.</p>
                    </p>
                    <button type='submit' className='bg-yellow-300 p-2 rounded-md font-medium tracking-wide'>Continue</button>
                </form>
                <Link to='/Login'>
                    <p className='text-xs tracking-wider mt-12'>Already have an account?
                        <span className='text-blue-700 font-medium hover:text-red-600 hover:underline cursor-pointer'>Sign in<span className='text-blue-500 -ml-1 hover:text-red-600'><ArrowRightIcon /></span>
                        </span>
                    </p>
                </Link>
                <p className='text-xs tracking-wider'>Buying for work?
                    <span className='text-blue-700 hover:text-red-600 font-medium hover:underline cursor-pointer'>Create a free business account
                        <span className='text-blue-500 -ml-1 hover:text-red-600'><ArrowRightIcon /></span>
                    </span>
                </p>
                <p className='text-xs tracking-wider mt-5'>By Creating or logging in, you agree to Amazon's<span className='text-blue-700 font-medium hover:text-red-600 hover:underline cursor-pointer'> Conditions of Use</span> and<span className='text-blue-700 hover:text-red-600 hover:underline font-medium cursor-pointer'> Privacy Policy.</span> </p>
            </div>
            <hr className="block mt-8 m-auto w-80" />
            <div className="flex justify-evenly w-80 m-auto mt-5">
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940" className=" text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Conditions of use
                </a>
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
                    className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Privacy Notice
                </a>
                <a href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
                    className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Help
                </a>
            </div>
            <div className="ml-[34%] text-xs mt-3 mb-5">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
        </div>
    )
}

export default SignUp
