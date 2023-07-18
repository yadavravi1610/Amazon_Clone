import React, { useEffect, useState } from "react";
// import SimpleImageSlider from "react-simple-image-slider/dist/ImageSlider";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
            <div className="main flex pt-[100px]">
                <div>
                    <img src={ArrowBackIosIcon} className="" onClick={handleprevious} />
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