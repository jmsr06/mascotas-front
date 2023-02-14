import React from "react";
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import mascotasApi from "../api/mascotasApi";

const Filtros = ({ filtro, setFiltro, searchTerm, setItem, url }) => {
    const [categorias, setCategorias] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [edades, setEdades] = useState([]);

    const [filtroCategoria, setFiltroCategoria] = useState(0);
    const [filtroSize, setFiltroSize] = useState(0);
    const [filtroEdad, setFiltroEdad] = useState(0);
    const [filtroSexo, setFiltroSexo] = useState('');
    const [filtroEsterilizacion, setFiltroEsterilizacion] = useState(0);

    const ref = useRef(null);
    useEffect(() => {
        const categoria = mascotasApi.get('/categorias')
        const size = mascotasApi.get('/sizes')
        const edad = mascotasApi.get('/edades')
        Promise.all([categoria, size, edad]).then(values => {
            setCategorias(values[0].data.data)
            setSizes(values[1].data.data)
            setEdades(values[2].data.data)
            if (searchTerm) {
                const cat = values[0].data.data.find((item) => {
                    return item.slug == searchTerm
                })
                if (cat) {
                    setFiltroCategoria(cat.id)
                }
            }
        })
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setFiltro(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
    }, [])

    let location = useLocation();

    const [opcionesCategoria, setOpcionesCategoria] = useState(false);
    const handleOpcionesCategoria = () => {
        setOpcionesCategoria(!opcionesCategoria);
    }

    const [opcionesSize, setOpcionesSize] = useState(false);
    const handleOpcionesSize = () => {
        setOpcionesSize(!opcionesSize);
    }

    const [opcionesEdad, setOpcionesEdad] = useState(false);
    const handleOpcionesEdad = () => {
        setOpcionesEdad(!opcionesEdad);
    }

    const [opcionesSexo, setOpcionesSexo] = useState(false);
    const handleOpcionesSexo = () => {
        setOpcionesSexo(!opcionesSexo);
    }
    const [opcionesEsterilizacion, setOpcionesEsterilizacion] = useState(false);
    const handleOpcionesEsterilizacion = () => {
        setOpcionesEsterilizacion(!opcionesEsterilizacion);
    }


    const resetFiltro = () => {
        setFiltroCategoria(0);
        setFiltroSize(0);
        setFiltroEdad(0);
        setFiltroSexo('');
        setFiltroEsterilizacion(0);
    };
    useEffect(() => {
        resetFiltro()
    }, [location])


    useEffect(() => {
        let params = {}
        if (filtroCategoria != 0) {
            params.categoria = filtroCategoria
        }
        if (filtroSize != 0) {
            params.size = filtroSize
        }
        if (filtroEdad != 0) {
            params.edad = filtroEdad
        }
        if (filtroSexo != '') {
            params.sexo = filtroSexo
        }
        if (filtroEsterilizacion != 0) {
            params.esterilizacion = filtroEsterilizacion
        }
        mascotasApi.get(url, {
            params
        }).then((res) => {
            setItem(res.data.data)
            params = {}
        })
    }, [filtroCategoria, filtroSize, filtroEdad, filtroSexo, filtroEsterilizacion, location])

    return (
        <div ref={ref} className={`${!filtro ? 'hidden' : ''} p-4 shadow-2xl w-48 h-screen bg-white fixed top-16 left-0 z-100`}>
            <ul className="" >
                <li className=" py-3 px-5 w-full">
                    <a onClick={handleOpcionesCategoria} className="cursor-pointer hover:opacity-50 font-semibold w-full no-underline inline-block">Especie <i className="text-gray-500 fa-solid fa-angle-down float-right"></i></a>
                    {opcionesCategoria &&
                        <ul className="mt-4 text-sm">
                            {categorias.map((categoria) => (
                                <li key={categoria.id}>
                                    <label htmlFor={`categoria-${categoria.id}`} className="cursor-pointer">
                                        <input id={`categoria-${categoria.id}`} name="categoria" type='radio' readOnly checked={filtroCategoria == categoria.id} value={categoria.id} onClick={() => setFiltroCategoria(categoria.id)} /> {categoria.nombre}
                                    </label>
                                </li>
                            ))}
                            <li>
                                <label htmlFor='categoria-todas' className="cursor-pointer">
                                    <input id="categoria-todas" name="categoria" type='radio' readOnly value='0' checked={filtroCategoria == 0} onClick={() => setFiltroCategoria(0)} /> Todas
                                </label>
                            </li>
                        </ul>
                    }
                </li>
                <li className="py-3 px-5 w-full">
                    <a onClick={handleOpcionesSize} className="cursor-pointer font-semibold hover:opacity-70 w-full no-underline inline-block">Tamaño <i className="text-gray-500 fa-solid fa-angle-down float-right"></i></a>
                    {opcionesSize &&
                        <ul className="mt-4 text-sm">
                            {sizes.map((size) => (
                                <li key={size.id}>
                                    <label htmlFor={`size-${size.id}`} className="cursor-pointer">
                                        <input id={`size-${size.id}`} name="size" type='radio' readOnly checked={filtroSize == size.id} value={size.id} onClick={() => setFiltroSize(size.id)} /> {size.nombre}
                                    </label>
                                </li>
                            ))}
                            <li>
                                <label htmlFor='size-todas' className="cursor-pointer">
                                    <input id="size-todas" name="size" type='radio' readOnly value='0' checked={filtroSize == 0} onClick={() => setFiltroSize(0)} /> Todas
                                </label>
                            </li>

                        </ul>
                    }
                </li>
                <li className="py-3 px-5 w-full">
                    <a onClick={handleOpcionesEdad} className="cursor-pointer font-semibold hover:opacity-70 w-full no-underline inline-block">Edad <i className="text-gray-500 fa-solid fa-angle-down float-right"></i></a>
                    {opcionesEdad &&
                        <ul className="mt-4 text-sm">
                            {edades.map((edad) => (
                                <li key={edad.id}>
                                    <label htmlFor={`edad-${edad.id}`} className="cursor-pointer">
                                        <input id={`edad-${edad.id}`} name="edad" type='radio' readOnly checked={filtroEdad == edad.id} value={edad.id} onClick={() => setFiltroEdad(edad.id)} /> {edad.nombre}
                                    </label>
                                </li>
                            ))}
                            <li>
                                <label htmlFor='edad-todas' className="cursor-pointer">
                                    <input id="edad-todas" name="edad" type='radio' readOnly value='0' checked={filtroEdad == 0} onClick={() => setFiltroEdad(0)} /> Todas
                                </label>
                            </li>
                        </ul>
                    }
                </li>
                <li className="py-3 px-5 w-full">
                    <a onClick={handleOpcionesSexo} className="cursor-pointer font-semibold hover:opacity-70 w-full no-underline inline-block">Sexo <i className="text-gray-500 fa-solid fa-angle-down float-right"></i></a>
                    {opcionesSexo &&
                        <ul className="mt-4 text-sm">
                            <li>
                                <label htmlFor='sexo-H' className="cursor-pointer">
                                    <input id='sexo-H' name="sexo" type='radio' readOnly checked={filtroSexo == 'H'} value='H' onClick={() => setFiltroSexo('H')} /> Hembra
                                </label>
                            </li>
                            <li>
                                <label htmlFor='sexo-M' className="cursor-pointer">
                                    <input id='sexo-M' name="sexo" type='radio' readOnly checked={filtroSexo == 'M'} value='M' onClick={() => setFiltroSexo('M')} /> Macho
                                </label>
                            </li>
                            <li>
                                <label htmlFor='sexo-todas' className="cursor-pointer">
                                    <input id="sexo-todas" name="sexo" type='radio' readOnly value='0' checked={filtroSexo == 0} onClick={() => setFiltroSexo(0)} /> Todos
                                </label>
                            </li>
                        </ul>
                    }
                </li>
                <li className="py-3 px-5 w-full">
                    <a onClick={handleOpcionesEsterilizacion} className="cursor-pointer font-semibold hover:opacity-70 w-full no-underline inline-block">Esterilizado <i className="text-gray-500 fa-solid fa-angle-down float-right"></i></a>
                    {opcionesEsterilizacion &&
                        <ul className="mt-4 text-sm">
                            <li>
                                <label htmlFor='esterilizacion-si' className="cursor-pointer">
                                    <input id='esterilizacion-si' name="esterilizacion" type='radio' readOnly checked={filtroEsterilizacion == '1'} value='1' onClick={() => setFiltroEsterilizacion(1)} /> No
                                </label>
                            </li>
                            <li>
                                <label htmlFor='esterilizacion-no' className="cursor-pointer">
                                    <input id='esterilizacion-no' name="esterilizacion" type='radio' readOnly checked={filtroEsterilizacion == '2'} value='2' onClick={() => setFiltroEsterilizacion(2)} /> Sí
                                </label>
                            </li>
                            <li>
                                <label htmlFor='esterilizacion-todas' className="cursor-pointer">
                                    <input id="esterilizacion-todas" name="esterilizacion" type='radio' readOnly value='0' checked={filtroEsterilizacion == 0} onClick={() => setFiltroEsterilizacion(0)} /> Todos
                                </label>
                            </li>
                        </ul>
                    }
                </li>
                <li className="cursor-pointer hover:opacity-70 font-semibold py-3 px-5 w-full">
                    <a onClick={() => resetFiltro()} className="w-full no-underline inline-block text-blue-700 text-sm"><i className="fa-solid fa-trash-can"></i> Borrar filtros</a>
                </li>
            </ul>
        </div>
    );
}

export default Filtros;