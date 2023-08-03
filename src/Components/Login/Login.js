import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { info } from "../../assets";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { exclamation } from "../../assets";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux/amazonSlice";


export default function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] =useState(false);
    const [needhelp, setNeedhelp] = useState(false);
    const showneedhelp = () => {
        setNeedhelp(!needhelp);

    };
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrorPassword("");
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setErrorMessage('');
    };

    const validateInput = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobileRegex = /^\d{10}$/;
        if (emailRegex.test(inputValue)) {
            setErrorMessage(''); // Input is a valid email address
        } else if (mobileRegex.test(inputValue)) {
            setErrorMessage(''); // Input is a valid mobile number
        } else {
            setErrorMessage('Please enter a valid email address or mobile number.');
        }

        if (!password) {
            setErrorPassword("Enter your password");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateInput();
        
        if (inputValue && password) {
            setLoading(true);
            signInWithEmailAndPassword(auth, inputValue, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    dispatch(setUserInfo({
                        id: user.uid,
                        username: user.displayName,
                        email: user.email,
                        image:user.photoURL,
                    }))
                    setLoading(false);
                    setSuccessMsg("Logged in successfully");
                    setTimeout(()=>{
                        navigate("/")
                        setSuccessMsg("");
                    },3000)
                    // ...
                })
                .catch((error) => {
                    setLoading(false);
                    const errorCode = error.code;
                    if(errorCode.includes("auth/user-not-found")){
                        setErrorMessage("Invalid Email");
                    }
                    if(errorCode.includes("auth/wrong-password")){
                        setErrorPassword("Wrong Password! try again");
                    }
                    console.log(errorCode)
                    // const errorMessage = error.message;
                    // console.log(errorCode, errorMessage)
                });
            setInputValue("");
            setPassword("");
        }

    };

    return (

        <>

            <div className="flex flex-col w-full h-screen">
                <Link to='/'>
                    <img className="w-48 m-auto mt-5" src="https://api.freelogodesign.org/assets/blog/img/20180911090509731amazon_logo_RGB.jpg" alt="amazon_log" />
                </Link>
                <div className="border border-1-smoke w-80 rounded-md m-auto">
                    <h1 className="mt-6 text-2xl ml-4  font-semibold">Sign in</h1>

                    <form onSubmit={handleSubmit}>
                        <p className="block mt-3 font-semibold text-sm ml-3 pl-2">Email or mobile phone number</p>
                        <input value={inputValue}
                            onChange={handleInputChange} type="text" className="w-72 ml-4 rounded-sm pl-1 mt-2 border border-gray-400 h-7" />
                        {errorMessage &&
                            <div className="text-xs font-normal italic text-red-500 p-2 flex flex-row">
                                <img className='w-4 text-red-500' src={exclamation} alt='info' />
                                <p>{errorMessage}</p>
                            </div>
                        }
                        <p className="block mt-3 font-semibold text-sm ml-3 pl-2">Password</p>
                        <input type="password" onChange={handlePassword} value={password} className="w-72 ml-4 rounded-sm pl-1 mt-2 border border-gray-400 h-7" />
                        {errorPassword &&
                            <div className="text-xs font-normal italic text-red-500 p-2 flex flex-row">
                                <img className='w-4 text-red-500' src={exclamation} alt='info' />
                                <p>{errorPassword}</p>
                            </div>
                        }
                        <button type="submit" className="mt-4 bg-yellow-400 w-72 rounded-lg text-sm h-8 block m-auto">Continue</button>
                        {
                            successMsg && <div>
                                <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className='text-base font-semibold text-green-600 border-[1px] text-center'>{successMsg}</motion.p>
                            </div>
                        }
                    </form>
                    {
                        loading && <div className='flex justify-center '>
                            <RotatingLines
                                strokeColor="orange"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </div>
                    }

                    <div className="block text-xs ml-3 w-72 mt-4 font-medium">
                        By continuing, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940" className="text-blue-700 font-medium hover:text-red-600 hover:underline">Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380" className="text-blue-700 font-medium hover:text-red-600 hover:underline">Privacy Notice</a>.
                    </div>
                    <div className="help flex">
                        {needhelp ? <img src="https://cdn-icons-png.flaticon.com/128/60/60995.png" alt="arrow"
                            className=" inline w-2 h-2  mt-4 ml-4" /> : <img src="https://cdn-icons-png.flaticon.com/128/724/724954.png" alt="arrow"
                                className=" inline w-2 h-2  mt-4 ml-4" />}
                        <span onClick={showneedhelp} className="font-semibold text-blue-700 hover:text-red-600 hover:underline text-xs p-3" >
                            Need help?
                        </span>
                        {needhelp && <>
                            <div className="mt-8 text-xs font-medium text-blue-700 -ml-20 pl-2 mb-5">
                                <span className="hover:text-red-600 hover:underline"> <div className="mr-12 mb-2 mt-1">Forgot Password</div>
                                </span>
                                <span className="hover:text-red-600 hover:underline "> <div>Other issues with Sign-In</div>
                                </span>
                            </div>
                        </>}
                    </div>
                </div>

                <div className="mt-5 text-gray-400 text-xs font-medium m-auto">New to Amazon? </div>
                <Link to='/SignUp'>
                    <div className="mt-3 p-2 text-xs font-medium border border-gray-300 w-80 rounded-md m-auto text-center cursor-pointer">Create your Amazon account</div>
                </Link>
                <hr className="block mt-8 m-auto w-80" />
                <div className="flex justify-evenly w-80 m-auto mt-5">
                    <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940" className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Conditions of use
                    </a>
                    <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
                        className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Privacy Notice
                    </a>
                    <a href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
                        className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Help
                    </a>
                </div>
                <div className="m-auto text-xs mt-3">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
            </div>
        </>
    )
}
