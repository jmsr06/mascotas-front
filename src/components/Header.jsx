import React, { useEffect } from 'react'
import Logo from "../../public/logos/logo_huellita1.png";
import MenuUser from "./MenuUser";
import MenuMobile from "./MenuMobile";
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    let location = useLocation();

    const [usuario, setUsuario] = useState(null)
    const [menuUser, setMenuUser] = useState(false);
    const handleMenuUser = () => {
        setMenuUser(!menuUser);
    }

    const [menuMobile, setMenuMobile] = useState(false);
    const handleMenuMobile = () => {
        setMenuMobile(!menuMobile);
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        setUsuario(user ? JSON.parse(user) : user)
    }, [location])

    useEffect(() => {
        const user = localStorage.getItem('user')
        setUsuario(user ? JSON.parse(user) : user)
    }, [])


    const menu = [
        {
            id: 1,
            url: '/',
            content: <i className="text-2xl fa-solid fa-house-chimney"></i>,
            img: ''
        },
        {
            id: 2,
            url: '/estado/adopta',
            content: 'En adopción',
            img: 'adopta'
        },
        {
            id: 3,
            url: '/estado/perdidos',
            content: 'Perdidos',
            img: 'perdidos'
        },
        {
            id: 4,
            url: '/estado/encontrados',
            content: 'Encontrados',
            img: 'encontrados'
        },
        {
            id: 5,
            url: '/fundaciones',
            content: 'Fundaciones',
            img: ''
        }
    ];

    return (
        <header >
            <nav className="fixed z-10 h-16 top-0 w-full bg-gray-100 flex justify-between py-0 px-6 border-b-gray-300 border-b ">
                <i onClick={handleMenuMobile} className="cursor-pointer hover:text-gray-600 fa-solid fa-bars text-2xl flex mt-4 lg:hidden"></i>
                <div className="navbar-left flex">
                    <Link to='/'>
                        <img src={Logo} alt="logo" className="cursor-pointer logo w-16 h-16" />
                    </Link>
                    <ul className="hidden list-none p-0 m-0 lg:flex items-center h-16 ml-3">
                        {menu.map(item => (
                            <li key={item.id}>
                                <Link className="no-underline m-1 border border-gray-100 text-blue-900 p-2 rounded-lg hover:border hover:border-blue-400 hover:text-blue-400"
                                    to={item.url}>
                                    {item.content}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {usuario != null ?
                    <div className='top-8 flex mt-4 gap-5 text-blue-900'>
                        <i onClick={handleMenuUser} className=" hover:text-blue-400 cursor-pointer text-2xl fa-solid fa-user"></i>
                    </div> :
                    <Link to={'/acceder'} className='hidden lg:flex items-center h-16 ml-3 '>
                        <span className='cursor-pointer no-underline m-1 text-blue-900 border border-blue-900 p-2 font-bold rounded-lg hover:border hover:border-blue-400 hover:text-blue-400'>Publicar mascota</span>
                    </Link>}
                {menuUser && <MenuUser  setMenuUser={setMenuUser}/>}
                {menuMobile && <MenuMobile />}
            </nav>
        </header>
    )
}

export default Header;
