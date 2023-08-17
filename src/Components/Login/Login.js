
import React, { useState, useEffect } from "react";
import { logoBlack } from '../../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import { right, down, exclamation, google, facebook } from "../../assets/index";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
// import ScrollToTop from "../ScrollToTop";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, linkWithCredential, FacebookAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setUserAuthentication, resetCart } from "../../Redux/amazonSlice";
import { db } from '../../firebase.config';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
// import { useCart } from "../../context/userCartContext";

const SignIn = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.amazon.products)

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState(false);
    const [needHelp, setNeedHelp] = useState(false);
    const handleNeedHelp = () => {
        setNeedHelp(!needHelp);
    };
    const handleNewClickEffect = (e) => {
        e.stopPropagation();
        setIsClicked(true);
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.classList.contains("clicked")) {
                setIsClicked(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [warningPassword, setWarningPassword] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [userEmailError, setUserEmailError] = useState("");
    const validate = () => {
        let isValid = true;
        if (inputValue === "") {
            setUserEmailError("Enter your email or mobile number");
            isValid = false;
        }
        if (passwordValue === "") {
            setWarningPassword("Enter your password");
            isValid = false;
        }
        return isValid;
    }

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const saveUserDataToFirebase = async (user) => {
        const usersCollectionRef = collection(db, "users");
        const userRef = doc(usersCollectionRef, user.email);
        try {
            const userRefSnapshot = await getDoc(userRef);
            // console.log(userRefSnapshot.exists())       
            // console.log(userRefSnapshot)           
            if (!userRefSnapshot.exists()) {
                const userDetailsRef = doc(userRef, "details", user.uid);
                const userDetailsSnapshot = await getDoc(userDetailsRef);
                // console.log(userDetailsSnapshot.exists())       
                // console.log(userDetailsSnapshot)            
                if (!userDetailsSnapshot.exists()) {
                    // If the user details don't exist, save them to Firestore
                    await setDoc(userDetailsRef, {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        image: user.photoURL,
                        mobile: user.phoneNumber,
                        createdOn: new Date(),
                    }, { merge: true });
                    // console.log("User details saved to Firestore.");
                } else {
                    console.log("User details already exist in Firestore.");
                }
            } else {
                console.log("User email already exists in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Use the updateUserCart function from custom hook created in userCartContext.js
    // const { updateUserCart } = useCart();

    const saveLocalCartToFirebase = async (user) => {
        const usersCollectionRef = collection(db, "users");
        const userRef = doc(usersCollectionRef, user.email);
        const userCartRef = collection(userRef, "cart");
        const cartRef = doc(userCartRef, user.uid);
        const docSnapshot = await getDoc(cartRef);
        const firebaseCartItems = docSnapshot.exists() ? docSnapshot.data().cart : [];
        const localCartItems = cartItems;
        // Create a map to track items using their unique identifiers (e.g., product title)
        const mergedItemsMap = new Map();
        // Add Firebase cart items to the mergedItemsMap using set function
        firebaseCartItems.forEach((item) => {
            mergedItemsMap.set(item.title, item);
        });
        localCartItems.forEach((item) => {
            if (mergedItemsMap.has(item.title)) {
                // If the item already exists in the Firebase cart, update its quantity
                const existingItem = mergedItemsMap.get(item.title);
                existingItem.quantity += item.quantity; // Update the quantity
            } else {
                // If the item doesn't exist in the Firebase cart, add it to the mergedItemsMap
                mergedItemsMap.set(item.title, item);
            }
        });
        // Convert the mergedItemsMap back to an array of items
        const mergedCartItems = Array.from(mergedItemsMap.values());
        // Update the cart in Firestore with the merged cart items
        await setDoc(cartRef, { cart: mergedCartItems });
        // Update the cart context with the merged cart items
        // updateUserCart(mergedCartItems);
        // After successfully saving to Firebase, clear the local cart
        dispatch(resetCart());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, inputValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUserInfo({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }));
                dispatch(setUserAuthentication(true));
                saveLocalCartToFirebase(user);
                setLoading(false);
                setSuccessMsg("Successfully Logged-in! Welcome back.");
                setTimeout(() => {
                    navigate("/");
                    setSuccessMsg("");
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                setLoading(false);
                if (errorCode.includes("auth/invalid-email")) {
                    setUserEmailError("Enter a valid Email");
                }
                if (errorCode.includes("auth/user-not-found")) {
                    setUserEmailError("Invalid Email! User not found.");
                }
                if (errorCode.includes("auth/wrong-password")) {
                    setWarningPassword("There was a problem.Your password is incorrect");
                }
                console.log("Something is up ", errorCode);
            });
        setInputValue("");
        setPasswordValue("");
    }

    const handleGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                dispatch(setUserInfo({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }));
                dispatch(setUserAuthentication(true));
                saveLocalCartToFirebase(user);
                const userRef = doc(db, "users", user.email);
                getDoc(userRef)
                    .then((docSnapshot) => {
                        // console.log(docSnapshot);
                        // console.log("!docSnapshot.exists()",!docSnapshot.exists());
                        if (!docSnapshot.exists()) {
                            // If the user data doesn't exist, save it to Firestore
                            saveUserDataToFirebase(user);
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking user data:", error);
                    });
                setLoading(false);
                setSuccessMsg("Successfully Logged-in! Welcome back.");
                setTimeout(() => {
                    navigate("/");
                    setSuccessMsg("");
                }, 2000);
            }).catch((error) => {
                const errorCode = error.code;
                console.log("error", errorCode)
                // The email of the user's account used.
                const email = error.customData.email;
                console.log(email)
            });
    }

    const handleFacebook = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                user.emailVerified = true;
                dispatch(setUserInfo({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }));
                dispatch(setUserAuthentication(true));
                saveLocalCartToFirebase(user);
                const userRef = doc(db, "users", user.email);
                getDoc(userRef)
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists()) {
                            // If the user data doesn't exist, save it to Firestore
                            saveUserDataToFirebase(user);
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking user data:", error);
                    });
                setLoading(false);
                setSuccessMsg("Successfully Logged-in! Welcome back.");
                setTimeout(() => {
                    navigate("/");
                    setSuccessMsg("");
                }, 2000);
            })
            .catch((error) => {
                // Check if the error is due to account linking
                if (error.code === "auth/account-exists-with-different-credential") {
                    const pendingCred = FacebookAuthProvider.credentialFromError(error);
                    const email = error.customData.email;
                    fetchSignInMethodsForEmail(auth, email)
                        .then((methods) => {
                            console.log(methods)
                            if (methods[0] === 'google.com') {
                                signInWithPopup(auth, googleProvider)
                                    .then((userCredential) => {
                                        const data = userCredential.user
                                        linkWithCredential(data, pendingCred)
                                            .then((result) => {
                                                const user = result.user;
                                                user.emailVerified = true;
                                                dispatch(setUserInfo({
                                                    id: user.uid,
                                                    name: user.displayName,
                                                    email: user.email,
                                                    image: user.photoURL
                                                }));
                                                dispatch(setUserAuthentication(true));
                                                saveLocalCartToFirebase(user);
                                                const userRef = doc(db, "users", user.email);
                                                getDoc(userRef)
                                                    .then((docSnapshot) => {
                                                        if (!docSnapshot.exists()) {
                                                            // If the user data doesn't exist, save it to Firestore
                                                            saveUserDataToFirebase(user);
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error checking user data:", error);
                                                    });
                                                setLoading(false);
                                                setSuccessMsg("Successfully Logged-in! Welcome back.");
                                                setTimeout(() => {
                                                    navigate("/");
                                                    setSuccessMsg("");
                                                }, 2000);
                                            });
                                    })
                            }
                            if (methods[0] === 'password') {
                                var password = prompt("Email associated with your Facebook has already account on Amazon. Please enter your Amazon password to link your Facebook account to your Amazon account."); // Replace with your custom password prompt logic.
                                signInWithEmailAndPassword(auth, email, password)
                                    .then((userCredential) => {
                                        const data = userCredential.user
                                        linkWithCredential(data, pendingCred)
                                            .then((result) => {
                                                const user = result.user;
                                                user.emailVerified = true;
                                                dispatch(setUserInfo({
                                                    id: user.uid,
                                                    name: user.displayName,
                                                    email: user.email,
                                                    image: user.photoURL
                                                }));
                                                dispatch(setUserAuthentication(true));
                                                saveUserDataToFirebase(user);
                                                saveLocalCartToFirebase(user);
                                                setLoading(false);
                                                setSuccessMsg("Successfully Logged-in! Welcome back.");
                                                setTimeout(() => {
                                                    navigate("/");
                                                    setSuccessMsg("");
                                                }, 2000);
                                            });
                                    })
                            }
                        });
                };
            });
    }

    return (
        <div className='bg-white w-full h-full'>
            <div className='flex flex-col justify-center items-center'>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-80 mt-4 border-[1px] rounded-lg'>
                    <div className='my-4 mx-7 '>
                        <span className='text-[28px] font-semibold'>
                            Sign in
                        </span>
                        {
                            successMsg
                                ? <div className=''>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 10, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className='text-base font-semibold text-green-600 border-[1px] my-8 text-center'
                                    >
                                        {successMsg}
                                    </motion.p>
                                </div>
                                : <div>
                                    <div onClick={handleGoogle} className=" cursor-pointer flex flex-row items-center my-3 border-[1px] p-[6px] border-black rounded-md hover:bg-slate-100 active:ring-2 active:ring-offset-1 active:ring-blue-600 active:border-transparent">
                                        <img src={google} alt="google" className="w-5 h-5 mx-5" />
                                        <p className="text-sm font-semibold">Continue with Google</p>
                                    </div>
                                    <div onClick={handleFacebook} className="cursor-pointer flex flex-row items-center  my-3 border-[1px] p-[6px] border-black rounded-md hover:bg-slate-100 active:ring-2 active:ring-offset-1 active:ring-blue-600 active:border-transparent">
                                        <img src={facebook} alt="facebook" className="w-5 mx-5 h-5" />
                                        <p className="text-sm font-semibold">Continue with Facebook</p>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <div className="w-[45%]"><hr /></div>
                                        <p className="text-sm font-semibold">Or</p>
                                        <div className="w-[45%]"><hr /></div>
                                    </div>
                                    <form className='mt-2 mb-3' onSubmit={handleSubmit}>
                                        <label className='text-sm font-semibold'>
                                            Email or mobile number
                                            <input type="text" autoComplete="true" value={inputValue} onChange={(e) => {
                                                setInputValue(e.target.value);
                                                setUserEmailError("");
                                            }} className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                                        </label>
                                        {
                                            userEmailError && <div className="flex  items-center  pt-1 pb-2">
                                                <img src={exclamation} className="w-4 h-4 mr-1" alt="warning" />
                                                <div className="text-xs text-[#FF0000]">{userEmailError}</div>
                                            </div>
                                        }
                                        <label className='text-sm font-semibold'>
                                            Password
                                            <input type="password" autoComplete="true" value={passwordValue} onChange={(e) => {
                                                setPasswordValue(e.target.value);
                                                setWarningPassword("");
                                            }} className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                                        </label>
                                        {
                                            warningPassword && <div className="flex  items-center pt-1 pb-2">
                                                <img src={exclamation} className="w-4 h-4 mr-1" alt="warning" />
                                                <div className="text-xs text-[#FF0000]">{warningPassword}</div>
                                            </div>
                                        }
                                        <button className={`${isClicked ? "clicked" : ""} text-sm my-4 w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px]`}
                                            onClick={(e) => { handleNewClickEffect(e) }}>Continue</button>
                                        {
                                            loading && <div className='flex justify-center'>
                                                <RotatingLines
                                                    strokeColor="#febd69"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="50"
                                                    visible={true}
                                                />
                                            </div>
                                        }

                                    </form>
                                </div>
                        }

                        <div className='text-xs tracking-wide '>
                            <span className=''>
                                By continuing, you agree to Amazon's
                                <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940' className='text-blue-500 hover:text-red-500 cursor-pointer'> Conditions of Use </a>
                                and
                                <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380' className='text-blue-500 hover:text-red-500 cursor-pointer'> Privacy Notice</a>.
                            </span>
                        </div>
                        <div className='flex items-center gap-2 mt-7 cursor-pointer group ' onClick={handleNeedHelp}>
                            <div className='w-2 h-2 text-gray-200'>
                                {
                                    needHelp ?
                                        <img src={down} alt='down' /> :
                                        <img src={right} alt='right' />
                                }

                            </div>
                            <div className=' text-xs  text-blue-500 group-hover:underline group-hover:text-red-500'>Need help?</div>
                        </div>
                        {
                            needHelp ?
                                (<div className=' text-xs  text-blue-500 cursor-pointer hover:underline hover:text-red-500 ml-4 mt-2 mb-5'>
                                    <Link to="forgotPassword">
                                        Forgot password
                                    </Link>
                                </div>)
                                : null
                        }
                    </div>
                </div>

                <div className='text-sm text-gray-500 my-4'>
                    New to Amazon?
                </div>


                <div className='w-80 text-[12px] font-medium tracking-wide text-center border-[1px] rounded-lg p-[5px] hover:bg-gray-100 mb-7 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500'>
                    <Link to="/createAccount">
                        <div>Create your Amazon account</div>
                    </Link>
                </div>
            </div>
            <hr className="w-11/12 mx-auto" />
            <div className="flex flex-row text-[11px] gap-4 mx-auto text-white justify-center tracking-wide pt-5 my-4">
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940" className='text-blue-500 hover:text-red-500 cursor-pointer'>Conditions of Use</a>
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380" className='text-blue-500 hover:text-red-500 cursor-pointer'>Privacy Notice</a>
                <p className='text-blue-500 hover:text-red-500 cursor-pointer'>Interest-Based Ads</p>
            </div>
            <div className='text-xs tracking-wider text-black flex justify-center mt-[4px] pb-16'>
                © 1996-2023, Amazon.com, Inc. or its affiliates
            </div>
            {/* <ScrollToTop /> */}
        </div>
    )
};

export default SignIn;




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import { info } from "../../assets";
// import { motion } from "framer-motion";
// import { collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase.config";
// import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail,linkWithCredential, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import { exclamation } from "../../assets";
// import { RotatingLines } from "react-loader-spinner";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart, setUserAuthentication, setUserInfo } from "../../Redux/amazonSlice";
// import { useCart } from "../../context/userCartContext";


// export default function Login() {
//     const auth = getAuth();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.amazon.products);
   
//     const provider = new GoogleAuthProvider();
//     const fbProvider = new FacebookAuthProvider();
//     const [loading, setLoading] = useState(false);
//     const [needhelp, setNeedhelp] = useState(false);
//     const showneedhelp = () => {
//         setNeedhelp(!needhelp);

//     };
//     const [inputValue, setInputValue] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorPassword, setErrorPassword] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     const handlePassword = (e) => {
//         setPassword(e.target.value);
//         setErrorPassword("");
//     }

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//         setErrorMessage('');
//     };

//     const validateInput = () => {
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         const mobileRegex = /^\d{10}$/;
//         if (emailRegex.test(inputValue)) {
//             setErrorMessage(''); // Input is a valid email address
//         } else if (mobileRegex.test(inputValue)) {
//             setErrorMessage(''); // Input is a valid mobile number
//         } else {
//             setErrorMessage('Please enter a valid email address or mobile number.');
//         }

//         if (!password) {
//             setErrorPassword("Enter your password");
//         }
//     };

//     const { updateUserCart } = useCart();
    
//     const saveUserDataToFirebase = async (user) => {
//         const userCollectionRef = collection(db, "users");
//         const userRef = doc(userCollectionRef, user.email);
//         try {
//             const userRefSnapshot = await getDoc(userRef);
//             // console.log(userRefSnapshot);
//             if (!userRefSnapshot.exists()) {
//                 const userDetailsRef = doc(userRef, "details", user.uid);
//                 const userDetailsSnapshot = await getDoc(userDetailsRef);
//                 if (!userDetailsSnapshot.exists()) {
//                     await setDoc(userDetailsRef, {
//                         id: user.uid,
//                         name: user.displayName,
//                         email: user.email,
//                         image: user.photoURL,
//                         mobile: user.phoneNumber,
//                         createdOn: new Date(),
//                     }, { merge: true });
//                 }
//                 else {
//                     console.log("User Details not exists in Firestore")
//                 }
//             }
//             else {
//                 console.log("User email not exists in Firestore")
//             }
//         }
//         catch (error) {
//             console.log("Error Fetching user details", error);
//         }
//     };

//     const saveLocalCartToFirebase = async (user) => {
//         const usersCollectionRef = collection(db, "users");
//         const userRef = doc(usersCollectionRef, user.email);
//         const userCartRef = collection(userRef, "cart");
//         const cartRef = doc(userCartRef, user.id);
//         const docSnapshot = await getDoc(cartRef);
//         const firebaseCartItems = docSnapshot.exists() ? docSnapshot.data().cart : [];
//         const localCartItems = cartItems;
//         const mergedItemsMap = new Map();
//         firebaseCartItems.forEach((item) => {
//             mergedItemsMap.set(item.title, item);
//         });
//         localCartItems.forEach((item) => {
//             if (mergedItemsMap.has(item.title)) {
//                 const existingItem = mergedItemsMap.get(item.title);
//                 existingItem.quantity += item.quantity;
//             }
//             else {
//                 mergedItemsMap.set(item.title, item);
//             }
//         });
//         const mergedCartItems = Array.from(mergedItemsMap.values());
//         await setDoc(cartRef, { cart: mergedCartItems });
//         updateUserCart(mergedCartItems);

//         dispatch(clearCart());

//     }


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         validateInput();

//         if (inputValue && password) {
//             setLoading(true);
//             signInWithEmailAndPassword(auth, inputValue, password)
//                 .then((userCredential) => {
//                     // Signed in 
//                     const user = userCredential.user;
//                     console.log(user);
//                     // retrieveUserDataToFirebase(user);
//                     dispatch(setUserInfo({
//                         id: user.uid,
//                         username: user.displayName,
//                         email: user.email,
//                         image: user.photoURL,
//                     }))
//                     dispatch(setUserAuthentication(true));
//                     saveLocalCartToFirebase(user);
//                     setLoading(false);
//                     setSuccessMsg("Logged in successfully");
//                     setTimeout(() => {
//                         navigate("/")
//                         setSuccessMsg("");
//                     }, 2000)
//                     // ...
//                 })
//                 .catch((error) => {
//                     setLoading(false);
//                     const errorCode = error.code;
//                     if (errorCode.includes("auth/user-not-found")) {
//                         setErrorMessage("Invalid Email! User not found.");
//                     }
//                     if (errorCode.includes("auth/invalid-email")) {
//                         setErrorMessage("Enter a valid Email");
//                     }
//                     if (errorCode.includes("auth/wrong-password")) {
//                         setErrorPassword("Wrong Password! try again");
//                     }
//                     console.log(errorCode)

//                 });
//             setInputValue("");
//             setPassword("");
//         }

//     };

//     const handleGoogleSignin = (e) => {
//         e.preventDefault();
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const user = result.user;
//                 dispatch(setUserInfo({
//                     id: user.uid,
//                     username: user.displayName,
//                     email: user.email,
//                     image: user.photoURL,
//                 }));
//                 dispatch(setUserAuthentication(true));
//                 saveLocalCartToFirebase(user);
//                 // handleSubmit({ preventDefault: () => {} });
//                 // console.log("Google", user);
//                 const userRef = doc(db, "users", user.email);
//                 getDoc(userRef)
//                     .then((docSnapshot) => {
//                         if (!docSnapshot.exists()) {
//                             saveUserDataToFirebase(user);
//                         }
//                     })
//                     .catch((error) => {
//                         console.log("Error checking user data: ", error);
//                     });
//                 setLoading(false);
//                 setSuccessMsg("Successfully Logged-in! Welcome back.");
//                 setTimeout(() => {
//                     navigate("/");
//                     setSuccessMsg("");
//                 }, 2000)

//             }).catch((error) => {

//             });
//     }

//     const handleFBSignin = () => {

//         signInWithPopup(auth, fbProvider)
//             .then((result) => {
//                 const user = result.user;
//                 user.emailVerified = true;
//                 console.log("Facebook", user);
//                 dispatch(setUserInfo({
//                     id: user.uid,
//                     username: user.displayName,
//                     email: user.email,
//                     image: user.photoURL,
//                 }));
//                 // handleSubmit({ preventDefault: () => { } });
//                 // console.log("Google", user);
//                 dispatch(setUserAuthentication(true));
//                 saveLocalCartToFirebase(user);
//                 const userRef = doc(db, "users", user.email);
//                 getDoc(userRef)
//                     .then((docSnapshot)=>{
//                         if(!docSnapshot.exists()){
//                             saveUserDataToFirebase(user);
//                         }
//                     })
//                     .catch((error)=>{
//                         console.error("Error checking user data: ", error)
//                     });
//                     setLoading(false);
//                     setSuccessMsg("Successfully Logged-in! Welcome back.");
//                 setTimeout(() => {
//                     navigate("/");
//                     setSuccessMsg("");
//                 }, 2000)
//             })
//             .catch((error) => {
//                 if (error.code === "auth/account-exists-with-different-credential") {
//                     const pendingCred = FacebookAuthProvider.credentialFromError(error);
//                     const email = error.customData.email;
//                     fetchSignInMethodsForEmail(auth, email)
//                         .then((methods) => {
//                             console.log(methods)
//                             if (methods[0] === 'google.com') {
//                                 signInWithPopup(auth, provider)
//                                     .then((userCredential) => {
//                                         const data = userCredential.user
//                                         linkWithCredential(data, pendingCred)
//                                             .then((result) => {
//                                                 const user = result.user;
//                                                 user.emailVerified = true;
//                                                 dispatch(setUserInfo({
//                                                     id: user.uid,
//                                                     name: user.displayName,
//                                                     email: user.email,
//                                                     image: user.photoURL
//                                                 }));
//                                                 dispatch(setUserAuthentication(true));
//                                                 saveLocalCartToFirebase(user);
//                                                 const userRef = doc(db, "users", user.email);
//                                                 getDoc(userRef)
//                                                     .then((docSnapshot) => {
//                                                         if (!docSnapshot.exists()) {
//                                                             // If the user data doesn't exist, save it to Firestore
//                                                             saveUserDataToFirebase(user);
//                                                         }
//                                                     })
//                                                     .catch((error) => {
//                                                         console.error("Error checking user data:", error);
//                                                     });
//                                                 setLoading(false);
//                                                 setSuccessMsg("Successfully Logged-in! Welcome back.");
//                                                 setTimeout(() => {
//                                                     navigate("/");
//                                                     setSuccessMsg("");
//                                                 }, 2000);
//                                             });
//                                     })
//                             }
//                             if (methods[0] === 'password') {
//                                 var password = prompt("Email associated with your Facebook has already account on Amazon. Please enter your Amazon password to link your Facebook account to your Amazon account."); // Replace with your custom password prompt logic.
//                                 signInWithEmailAndPassword(auth, email, password)
//                                     .then((userCredential) => {
//                                         const data = userCredential.user
//                                         linkWithCredential(data, pendingCred)
//                                             .then((result) => {
//                                                 const user = result.user;
//                                                 user.emailVerified = true;
//                                                 dispatch(setUserInfo({
//                                                     id: user.uid,
//                                                     name: user.displayName,
//                                                     email: user.email,
//                                                     image: user.photoURL
//                                                 }));
//                                                 dispatch(setUserAuthentication(true));
//                                                 saveUserDataToFirebase(user);
//                                                 saveLocalCartToFirebase(user);
//                                                 setLoading(false);
//                                                 setSuccessMsg("Successfully Logged-in! Welcome back.");
//                                                 setTimeout(() => {
//                                                     navigate("/");
//                                                     setSuccessMsg("");
//                                                 }, 2000);
//                                             });
//                                     })
//                             }
//                         });
//                 };

//             });
//     }

//     return (

//         <>

//             <div className="flex flex-col w-full h-screen">
//                 <Link to='/'>
//                     <img className="w-48 m-auto mt-5" src="https://api.freelogodesign.org/assets/blog/img/20180911090509731amazon_logo_RGB.jpg" alt="amazon_log" />
//                 </Link>
//                 <div className="border border-1-smoke w-80 rounded-md m-auto">
//                     <h1 className="mt-6 text-2xl ml-4  font-semibold">Sign in</h1>

//                     <form onSubmit={handleSubmit}>
//                         <p className="block mt-3 font-semibold text-sm ml-3 pl-2">Email or mobile phone number</p>
//                         <input value={inputValue}
//                             onChange={handleInputChange} type="text" className="w-72 ml-4 rounded-sm pl-1 mt-2 border border-gray-400 h-7" />
//                         {errorMessage &&
//                             <div className="text-xs font-normal italic text-red-500 p-2 flex flex-row">
//                                 <img className='w-4 text-red-500' src={exclamation} alt='info' />
//                                 <p>{errorMessage}</p>
//                             </div>
//                         }
//                         <p className="block mt-3 font-semibold text-sm ml-3 pl-2">Password</p>
//                         <input type="password" onChange={handlePassword} value={password} className="w-72 ml-4 rounded-sm pl-1 mt-2 border border-gray-400 h-7" />
//                         {errorPassword &&
//                             <div className="text-xs font-normal italic text-red-500 p-2 flex flex-row">
//                                 <img className='w-4 text-red-500' src={exclamation} alt='info' />
//                                 <p>{errorPassword}</p>
//                             </div>
//                         }
//                         <button type="submit" className="mt-4 bg-yellow-400 w-72 rounded-lg text-sm h-8 block m-auto">Continue</button>
//                         {
//                             successMsg && <div>
//                                 <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className='text-base font-semibold text-green-600 border-[1px] text-center'>{successMsg}</motion.p>
//                             </div>
//                         }

//                     </form>
//                     <button onClick={handleGoogleSignin} className="mt-4 bg-yellow-400 w-72 rounded-lg text-sm h-8 block m-auto">Sign In with Google</button>
//                     <button onClick={handleFBSignin} className="mt-4 bg-yellow-400 w-72 rounded-lg text-sm h-8 block m-auto">Sign In with Facebook</button>

//                     {
//                         loading && <div className='flex justify-center '>
//                             <RotatingLines
//                                 strokeColor="orange"
//                                 strokeWidth="5"
//                                 animationDuration="0.75"
//                                 width="50"
//                                 visible={true}
//                             />
//                         </div>
//                     }

//                     <div className="block text-xs ml-3 w-72 mt-4 font-medium">
//                         By continuing, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940" className="text-blue-700 font-medium hover:text-red-600 hover:underline">Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380" className="text-blue-700 font-medium hover:text-red-600 hover:underline">Privacy Notice</a>.
//                     </div>
//                     <div className="help flex">
//                         {needhelp ? <img src="https://cdn-icons-png.flaticon.com/128/60/60995.png" alt="arrow"
//                             className=" inline w-2 h-2  mt-4 ml-4" /> : <img src="https://cdn-icons-png.flaticon.com/128/724/724954.png" alt="arrow"
//                                 className=" inline w-2 h-2  mt-4 ml-4" />}
//                         <span onClick={showneedhelp} className="font-semibold text-blue-700 hover:text-red-600 hover:underline text-xs p-3" >
//                             Need help?
//                         </span>
//                         {needhelp && <>
//                             <div className="mt-8 text-xs font-medium text-blue-700 -ml-20 pl-2 mb-5">
//                                 <span className="hover:text-red-600 hover:underline"> <div className="mr-12 mb-2 mt-1">Forgot Password</div>
//                                 </span>
//                                 <span className="hover:text-red-600 hover:underline "> <div>Other issues with Sign-In</div>
//                                 </span>
//                             </div>
//                         </>}
//                     </div>
//                 </div>

//                 <div className="mt-5 text-gray-400 text-xs font-medium m-auto">New to Amazon? </div>
//                 <Link to='/SignUp'>
//                     <div className="mt-3 p-2 text-xs font-medium border border-gray-300 w-80 rounded-md m-auto text-center cursor-pointer">Create your Amazon account</div>
//                 </Link>
//                 <hr className="block mt-8 m-auto w-80" />
//                 <div className="flex justify-evenly w-80 m-auto mt-5">
//                     <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940" className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Conditions of use
//                     </a>
//                     <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380"
//                         className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Privacy Notice
//                     </a>
//                     <a href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
//                         className="text-blue-700 text-xs font-medium hover:text-red-600 hover:underline">Help
//                     </a>
//                 </div>
//                 <div className="m-auto text-xs mt-3">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
//             </div>
//         </>
//     )
// }
