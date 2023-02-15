import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const MenuMobile = () => {
    const [usuario, setUsuario] = useState(null)
    useEffect(() => {
        const user = localStorage.getItem('user')
        setUsuario(user ? JSON.parse(user) : user)
    }, [])
    return (
        <div className="p-4 shadow-xl w-48 h-screen bg-gray-200 fixed top-16 left-0 z-100">
            <ul className="list-none">
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <Link className="no-underline font-bold" to={"/"}><i className="fa-solid fa-house-chimney"></i> HOME</Link>
                </li>
                {usuario == null &&
                    <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                        <Link className="no-underline font-bold" to={"/acceder"}>Publicar mascota</Link>
                    </li>}
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <Link className="no-underline font-bold" to={"/estado/adopta"} >En adopción</Link>
                </li>
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <Link className="no-underline font-bold" to={"/estado/perdidos"}>Perdidos</Link>
                </li>
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <Link className="no-underline font-bold" to={"/estado/encontrados"} >Encontrados</Link>
                </li>
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <Link className="no-underline font-bold" to={"/fundaciones"} >Fundaciones</Link>
                </li>
            </ul>
        </div>
    );
}

export default MenuMobile;