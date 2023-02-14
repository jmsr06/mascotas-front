import React from 'react'

const Redes = (props) => {
    return (
        <a className={`${props.color} mb-1 lg:hover:pr-16 text-white no-underline p-3 flex transition-all w-12 md:w-12`}
            href={props.url} target="__blanck" >
            <i className={`fa-brands fa-${props.red}`}></i>
        </a>
    )
}

export default Redes
