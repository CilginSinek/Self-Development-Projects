import React from 'react'
import MyCard from '../MyCard';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import "./SliderScroll.css"

function SliderScroll({ clothes }) {

    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    return (

        <div id='main-slider-container'>

            <div id="slider">
                {
                    clothes.map((item, key) => <MyCard item={item} key={key} /> )
                }
            </div>
            <ArrowBackIcon boxSize={10} className="slider-icon left" onClick={slideRight} />
            <ArrowForwardIcon boxSize={10} className="slider-icon right" onClick={slideLeft} />
        </div>
    )
}


export default SliderScroll