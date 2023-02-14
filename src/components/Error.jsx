import React from 'react'

const Error = ({ children }) => {
    return (
        <li className='text-center h-8 leading-8 px-3 mb-1 bg-red-600 text-white font-bold border-l-4 border-black w-full'>
            {children}
        </li>
    )
}

export default Error
