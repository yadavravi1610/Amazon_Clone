import React from 'react';
import Slider from './Slider';
// import Products from '../Home/products';
import { bannerImgOne, bannerImgTwo, bannerImgThree, bannerImgFour, bannerImgFive} from "../assets/assets/index"
import Category from '../Components/Category/Category';
import ProductsSlider from './productSlider';

const Home = () => {
    const sampleImage = [
        bannerImgOne,
        bannerImgTwo,
        bannerImgThree,
        bannerImgFour,
        bannerImgFive
    ]
    return (
        <div>
            <Slider images={sampleImage} />
            <div className='sml:-mt-28 mdl:-mt-60' ><Category /></div>
            {/* <div><Product /></div> */}
            <div><ProductsSlider /></div>
        </div>
    )
}

export default Home