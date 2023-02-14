import React, { useEffect, useState } from 'react'
import mascotasApi from "../api/mascotasApi";
import { useNavigate  } from "react-router-dom";

const Log = () => {
    const navigate = useNavigate();
    const [confirmarContraseña, setConfirmarContraseña] = useState('')
    const [msg, setMsg] = useState('')
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [registro, setRegistro] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (registro.password != confirmarContraseña) {
            setMsg('Las contraseñas no coinciden')
            document.getElementById('registrarse').disabled = true
        } else {
            setMsg('')
            document.getElementById('registrarse').disabled = false
        }

    }, [confirmarContraseña, registro])

    const handleConfirmarContraseña = (e) => {
        setConfirmarContraseña(e.target.value)
    }
    const handleAcceder = async (e) => {
        e.preventDefault();
        try {
            const usuario = await mascotasApi.post(`/login`, login)
            localStorage.setItem("user", JSON.stringify(usuario.data.data))
            navigate("/");
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    const handleRegistrar = async (e) =>{
        e.preventDefault();
        console.log('entrando register')
        try {
            const usuario = await mascotasApi.post(`/register`, registro)
            localStorage.setItem("user", JSON.stringify(usuario.data.data))
            navigate("/");
        }
        catch (error) {
            console.log(error.response.data)
        }
    }
    const changeEmail = (e) => {
        setLogin({
            email: e.target.value,
            password: login.password
        })
    }
    const changePassword = (e) => {
        setLogin({
            email: login.email,
            password: e.target.value
        })
    }
    const changeRegistroEmail = (e) => {
        setRegistro({
            email: e.target.value,
            password: registro.password
        })
    }
    const changeRegistroPassword = (e) => {
        setRegistro({
            email: registro.email,
            password: e.target.value
        })
    }

    return (
        <div className=' m-10 md:m-20 md:grid md:grid-cols-2 md:gap-10'>
            <div className='mb-10 md:mb-0 border p-10 border-gray-300'>
                <h1 className='text-gray-800 mt-10 mb-3 text-center font-bold text-3xl'>Iniciar sesion</h1>
                <hr />
                <form className='mt-10' onSubmit={handleAcceder}>
                    <div className='mb-8'>
                        <label className='block mb-1' >Correo electrónico*</label>
                        <input onChange={changeEmail} placeholder='email' className='border border-gray-300 w-full h-10 p-2' />
                    </div>
                    <div className='mb-8'>
                        <label className='block mb-1'>Contraseña*</label>
                        <input onChange={changePassword} type='password' placeholder='contraseña' className='border border-gray-300 w-full h-10 p-2' />
                    </div>
                    <button className='border w-full h-10 text-white font-bold bg-blue-600 hover:bg-blue-500'>Acceder</button>
                </form>
            </div>
            <div className='border p-10 border-gray-300'>
                <h1 className='text-gray-800 mt-10 mb-3 text-center font-bold text-3xl'>Registrarse</h1>
                <hr />
                <form className='mt-10' onSubmit={handleRegistrar}>
                    <div className='mb-8'>
                        <label className='block mb-1'>Correo electrónico*</label>
                        <input onChange={changeRegistroEmail} placeholder='email' className='border border-gray-300 w-full h-10 p-2' />
                    </div>
                    <div className='mb-8'>
                        <label className='block mb-1' >Contraseña*</label>
                        <input
                            onChange={changeRegistroPassword}
                            type='password' placeholder='contraseña' className='border border-gray-300 w-full h-10 p-2' />
                    </div>
                    <div >
                        <label className='block mb-1'>Confirmar contraseña*</label>
                        <input
                            value={confirmarContraseña}
                            onInput={handleConfirmarContraseña}
                            type='password' placeholder='confirmar contraseña' className='border border-gray-300 w-full h-10 p-2' />
                    </div>
                    <div className='text-red-600 mb-8'>{msg}</div>
                    <button id='registrarse' className={`border w-full h-10 text-white font-bold bg-blue-600 hover:bg-blue-500 ${msg && 'opacity-40 hover:bg-blue-600 cursor-default'}`}>Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default Log
