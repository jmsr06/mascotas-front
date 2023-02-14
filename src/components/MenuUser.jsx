import React, { useEffect, useState } from "react";
import mascotasApi from "../api/mascotasApi";
import { useNavigate } from "react-router-dom";

const MenuUser = ({ setMenuUser }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null)
    const [fundacion, setFundacion] = useState(null)
    useEffect(() => {
        let user = localStorage.getItem('user')
        user = user != null ? JSON.parse(user) : null
        setUsuario(user)
        if (user != null) {
            setFundacion(user.fundacion)
        }
        console.log(fundacion)
    }, [])

    const handleLogout = async () => {
        try {
            await mascotasApi.post(`/logout`)
            localStorage.setItem("user", null)
            setMenuUser(false)
            navigate("/");
        }
        catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <div className="shadow-lg z-50 fixed top-16 right-0 bg-gray-200 w-auto h-auto border border-gray-200 rounded-md mr-2 ">
            <ul className="text-right" >
                {fundacion ? <li className="cursor-pointer border-b border-gray-400 hover:opacity-70 font-semibold py-3 px-5 w-full">
                    <a href={`/editar-fundacion/${fundacion.slug}`} className="no-underline inline-block">Mi perfil</a>
                </li> : <li className="cursor-pointer border-b border-gray-400 hover:opacity-70 font-semibold py-3 px-5 w-full">
                    <a href="/crear-fundacion" className="no-underline inline-block">Crear perfil</a>
                </li>}
                {fundacion && <li className="cursor-pointer border-b border-gray-400 hover:opacity-70 font-semibold py-3 px-5 w-full">
                    <a href="/fundacion/ver-mascotas" className="no-underline inline-block">Mis publicaciones</a>
                </li>}
                <li className="cursor-pointer hover:opacity-50 font-bold py-3 px-5 w-full">
                    <button onClick={handleLogout} className="text-blue-700 text-sm no-underline inline-block font-black">Cerrar sesión</button>
                </li>
            </ul>
        </div>
    );
}

export default MenuUser;