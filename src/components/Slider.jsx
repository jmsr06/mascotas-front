import React, { useState } from 'react'
import BtnSlider from './BtnSlider'

const Slider = (props) => {
    const [slideIndex, setSlideIndex] = useState(1)
    const nextSlide = () => {
        if (slideIndex !== props.imagenes.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === props.imagenes.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(props.imagenes.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className= {`${props.height} ${props.width} relative overflow-hidden shadow-lg`}>
            {props.imagenes.map((obj, index) => (
                    <div
                        key={obj.prioridad}
                        className={slideIndex === index + 1 ? "transition ease-in-out duration-300 w-full h-full absolute" : "transition ease-in-out duration-300 w-full h-full absolute opacity-0"}
                    >
                        <img
                        className='w-full h-full object-cover'
                            src={obj.url}
                        />
                    </div>
                ))}
            <BtnSlider key="next" moveSlide={nextSlide} direction={"next"} />
            <BtnSlider key="prev" moveSlide={prevSlide} direction={"prev"} />

            <div className="-translate-x-1/2 absolute bottom-2 left-1/2 flex">
                {Array.from({ length: props.imagenes.length }).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot w-3 h-3 rounded-full border mx-1 bg-black " : "dot w-3 h-3 rounded-full border mx-1 bg-gray-500"}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Slider
