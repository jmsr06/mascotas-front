import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Card = ({titulo, item}) => {
  let location = useLocation();

  return (
    <Link onClick={()=> window.scrollTo(0,0)} to={titulo == 'fundaciones' ? `/fundacion/${item.slug}` : `/${location.pathname}/mascota/${item.slug}`}  className="justify-self-center mb-10 w-40 md:w-52 lg:w-60 2xl:w-72 cursor-pointer hover:opacity-80">
      <img className=" w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 2xl:h-72 2xl:w-72 object-cover" src={titulo == 'fundaciones' ? `${item.logo}` : item.imagen}/>
      <div className="flex justify-between items-center mt-3">
        <div>
          <p className="block font-bold text-base mt-0 mb-1 capitalize">{item.nombre}</p>
          {titulo == 'fundaciones' ? <p className="text-sm mt-0 mb-0 text-gray-400"><i className="fa-solid fa-location-dot"></i> {item.ciudad}</p> : <p className="text-sm mt-0 mb-0 text-gray-400 capitalize">{item.edad}, {item.size}</p>}
        </div>
      </div>
    </Link>
  )
}

export default Card;
