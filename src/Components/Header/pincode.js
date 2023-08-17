import React, { useEffect, useRef, useState } from 'react';
import { exclamation, location } from '../../assets/index';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';


const Pincode = () => {

    const ref = useRef();
    const [showpin, setShowpin] = useState(false);
    // console.log(showpin);

    const [userZipCode, setUserZipCode] = useState(''); // State for the user's entered ZIP code
    const [locationName, setLocationName] = useState(null);
    const [warning, setWarning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [locationWarning, setLocationWarning] = useState(false);

    async function fetchLocationData(userZipCode) {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${userZipCode}`);
        if (response.data[0].PostOffice != null) {
            setLocationName(response.data);
            setWarning(false);
            setLoading(false);
            setShowpin(false);
        }
        else{
            setLocationWarning(true);
            setLoading(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            if (e.target.contains(ref.current)) {
                setShowpin(false);
            }
        })
    }, [ref, showpin])

    const validate = () => {
        const reqPincode = /^[0-9]{6}$/;
        let valid = true;

        if (userZipCode === "") {
            setWarning("Please enter Pincode");
            valid = false;
        }
    
        if (userZipCode.length > 0) {
            if (!reqPincode.test(userZipCode)) {
                setWarning("Please enter a valid Pincode");
                valid = false;
            }
        }
        return valid
    }

    const handleSumit = async (e) => {
        e.preventDefault();
        const valid = validate();
        if (!valid) {
            return;
        }
        setLoading(true);
        fetchLocationData(userZipCode);
        setUserZipCode("");
    };


    return (
        <>
            <div className='headerHover hidden mdl:inline-flex' onClick={() => setShowpin(!showpin)}>
                <img className='pt-2' alt='' src={location} />
                <div className="text-xs text-lightText font-medium flex flex-col items-start">
                    {locationName ? 'Deliver to' : 'Hello'}
                    <span className="text-sm font-bold -mt-1 text-whiteText">
                        {locationName ? <p>{locationName[0].PostOffice[0].District} {locationName[0].PostOffice[0].Pincode}</p> : 'Select your address'}
                    </span>
                </div>
            </div>
            {
                showpin &&
                <div className='w-full h-screen text-black bg-amazon_blue fixed left-0 top-16 bg-opacity-50'>
                    <div ref={ref} className='flex justify-center mt-40'>
                        <div className='w-96 h-auto bg-white rounded-md '>
                            <div className='flex pl-10 items-center h-16 rounded-md bg-slate-100 text-lg font-semibold'>
                                Choose Your Location
                            </div>
                            <div className='flex flex-col gap-4 my-3 px-5'>
                                <p className='text-sm text-slate-500 '>Select a delivery to see product availability and delivery options</p>
                                <Link to="/Login">
                                <button className='w-72 ml-3 h-8 text-sm bg-yellow-400 rounded-md py-1 font-semibold cursor-pointer'>
                                    Sign in
                                </button>
                                </Link>
                                <hr className='w-80' />
                            </div>
                            <form className='w-full h-full px-5 pb-4'>
                                <input type='text' placeholder='Enter your Pincode' className='w-56 pl-2 rounded h-7 border border-black ' onChange={(e) => {setUserZipCode(e.target.value); setWarning(false); setLocationWarning(false)}} />
                                <button onClick={handleSumit} className='mx-5 p-1 w-20 border rounded border-slate-400 hover:bg-slate-100 text-sm active:ring-2 active:ring-offset-1 active:ring-blue-300'>Apply</button>
                                {
                                    warning && <div className="flex items-center pl- mt-1 pb-2">
                                        <img src={exclamation} className="w-4 h-4" alt="warning" />
                                        <div className="text-zsm text-[#FF0000]">Please enter a valid pincode</div>
                                    </div>
                                }
                                {
                                    locationWarning && <div className="flex items-center pl- mt-1 pb-2">
                                        <img src={exclamation} className="w-4 h-4" alt="warning" />
                                        <div className="text-zsm text-[#FF0000]">Address not found</div>
                                    </div>
                                }
                                {
                                    loading && <div className='flex justify-center mt-2'>
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

                    </div>
                </div>
            }
        </>
    )
}

export default Pincode
