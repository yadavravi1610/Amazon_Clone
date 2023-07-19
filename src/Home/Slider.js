import React, { useEffect, useState } from "react";
import { back } from '../assets/index';

function Slider({images}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleprevious=()=>{
        setCurrentIndex((prevIndex)=>
        prevIndex===0?images.length-1: prevIndex-1);
    }
    
    const handlenext=(()=> 
        setCurrentIndex((prevIndex)=>
        prevIndex===images.length-1?0: prevIndex+1
    )
    );

    useEffect(()=>{
        const interval = setInterval(()=>{
            handlenext();
        },3000);
        return()=>{
            clearInterval(interval);
        };
    },[currentIndex]);
    return(
        <>
            <div className="main flex relative">
                <div className="absolute w-10 border-transparent cursor-pointer">
                    <span>&lt;</span>
                </div>

                <div>
                    <img src={images[currentIndex]} alt="Image slider" className="" />
                </div>
                <div>
                    <button onClick={handlenext} className="">Next</button>
                </div>
            </div>
        </>
    )
}
export default Slider;