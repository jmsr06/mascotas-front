import React from "react";

const BtnSlider = ({ direction, moveSlide }) => {
    return (
        <button
            onClick={moveSlide}
            className={direction === "next" ? "opacity-70 rounded-full bg-gray-200 w-8 h-8 absolute flex justify-center items-center cursor-pointer next -translate-y-2/3 top-1/2 right-2" : "opacity-70 rounded-full bg-gray-200 w-8 h-8 absolute flex justify-center items-center cursor-pointer prev -translate-y-2/3 top-1/2 left-1 "}>
            {direction === "next" ? <i className="text-xl text-gray-600 fa-solid fa-angle-right"></i> : <i className="text-xl text-gray-600 fa-solid fa-angle-left"></i>}
        </button>
    )
}

export default BtnSlider
