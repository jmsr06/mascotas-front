import React, { useEffect, useState } from "react";

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
                    <a className="no-underline font-bold" href="/"><i className="fa-solid fa-house-chimney"></i> HOME</a>
                </li>
                {usuario == null &&
                    <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                        <a className="no-underline font-bold" href="/acceder">Publicar mascota</a>
                    </li>}
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <a className="no-underline font-bold" href="/estado/adopta">En adopción</a>
                </li>
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <a className="no-underline font-bold" href="/estado/perdidos">Perdidos</a>
                </li>
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <a className="no-underline font-bold" href="/estado/encontrados">Encontrados</a>
                </li>
                <li className="cursor-pointer p-3 hover:opacity-50 border-b border-gray-400">
                    <a className="no-underline font-bold" href="/fundaciones">Fundaciones</a>
                </li>
            </ul>
        </div>
    );
}

export default MenuMobile;