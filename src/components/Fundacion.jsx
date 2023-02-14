import Redes from './Redes';
import { useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import mascotasApi from "../api/mascotasApi";
import Filtros from '../components/Filtros';
import Card from './Card';

export async function loader({ request, params }) {
    const url = new URL(request.url);
    let estado = url.searchParams.get("estado");
    let data = []
    try {
        const fundacion = await mascotasApi.get(`/fundaciones/${params.slugFundacion}`)
        data = fundacion.data.data
    } catch (error) {
        console.log(error)
    }

    if (!estado) {
        estado = 'adopta'
    }

    let dataMascotas = []
    const ruta = `/fundacion/${params.slugFundacion}/mascotas/${estado}`

    try {
        const mascotas = await mascotasApi.get(ruta)
        dataMascotas = mascotas.data.data
    } catch (error) {
        console.log(error)
    }
    return { data, dataMascotas, estado, ruta }
}


const Fundacion = () => {
    const { data, dataMascotas, estado, ruta } = useLoaderData();
    const [fundacion, setFundacion] = useState(data)
    const [mascotas, setMascotas] = useState(dataMascotas)
    const [filtro, setFiltro] = useState(false);
    const [estadoParam, setEstadoParam] = useState(estado);

    const handleFiltro = () => {
        setFiltro(!filtro);
    }
    let contador = 0;
    if (fundacion.direccion) {
        contador += 1
    }
    if (fundacion.telefono) {
        contador += 1
    }
    if (fundacion.email) {
        contador += 1
    }
    return (
        <main className="px-3 py-6 place-items-start place-content-start md:grid-rows-auto md:grid-cols-1 md:px-2 md:py-10 md:pt-5 lg:grid-rows-auto lg:grid-cols-1 lg:px-10 lg:py-16 lg:pt-8">
            <div
                className=" bg-fondo h-80 w-full flex justify-center pt-16 md:pt-24 md:h-96 lg:pt-24 bg-cover">
                <img className="absolute top-24 border border-gray-300 shadow-2xl rounded-full  w-24 h-24 md:w-40 md:h-40 md:top-28 object-cover bg-center bg-cover bg-no-repeat"
                    src={fundacion.logo} />
                <div className="mt-16 md:mt-24 w-full flex flex-col items-center px-4 pb-4 overflow-y-hidden">
                    <h1
                        className=" w-full uppercase font-black text-base text-center tracking-wide whitespace-nowrap text-ellipsis truncate md:text-lg lg:text-xl">
                        {fundacion.nombre}
                    </h1>
                    <div
                        className={`grid grid-cols-1 md:grid-cols-${contador} lg:grid-cols-${contador} my-4 w-full text-sm text-center md:text-base lg:text-base lg:px-20`}>
                        {fundacion.direccion ? <span className='capitalize'><i className="fa-solid fa-location-dot"></i> {fundacion.direccion}, {fundacion.ciudad}</span> : ''}
                        {fundacion.email ? <span className='col-start-1 col-end-3 md:col-start-auto md:col-end-auto'><i className="fa-solid fa-envelope"></i> {fundacion.email}</span> : ''}
                        {fundacion.telefono ? <span><i className="fa-solid fa-phone"></i> {fundacion.telefono}</span> : ''}
                    </div>
                    <div
                        className=" w-full line-clamp-3 text-sm text-center md:text-base lg:text-base lg:px-20">
                        {fundacion.descripcion}
                    </div>
                </div>
            </div>
            <ul className='list-none p-0 m-0 flex items-center w-full border border-gray-300 h-9'>
                <li >
                    <a className={`no-underline font-semibold px-6 border-r border-gray-300 ${estadoParam == 'adopta' ? 'text-blue-500 border-blue-300 border-b-2' : ' hover:text-blue-500 hover:border-blue-300 hover:border-b-2'} `}
                        href={`/fundacion/${fundacion.slug}?estado=adopta`}>
                        Adopta
                    </a>
                </li>
                <li >
                    <a className={`no-underline font-semibold px-6 border-r border-gray-300 ${estadoParam == 'perdidos' ? 'text-blue-500 border-blue-300 border-b-2' : ' hover:text-blue-500 hover:border-blue-300 hover:border-b-2'}`}
                        href={`/fundacion/${fundacion.slug}?estado=perdidos`}>
                        Perdidos
                    </a>
                </li>
                <li >
                    <a className={`no-underline font-semibold px-6 md:border-r md:border-gray-300 ${estadoParam == 'encontrados' ? 'text-blue-500 border-blue-300 border-b-2' : ' hover:text-blue-500 hover:border-blue-300 hover:border-b-2'} `}
                        href={`/fundacion/${fundacion.slug}?estado=encontrados`}>
                        Encontrados
                    </a>
                </li>
            </ul>
            <div className='w-full flex justify-end'>
                <button onClick={handleFiltro} className='mr-4 cursor-pointer mt-5 border border-gray-800 w-2/6 md:w-3/12 lg:w-1/12 h-9 justify-center flex items-center uppercase gap-2'>
                    <i className="fa-solid fa-filter"></i><p className='text-sm'>Filtros</p>
                </button>
            </div>

            <Filtros url={ruta} filtro={filtro} setFiltro={setFiltro} searchTerm={null} setItem={setMascotas} />
            {mascotas ? 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
                {mascotas.map((obj) => (
                    <Card key={obj.id} titulo={obj.estado} item={obj} />
                )
                )}
            </div>
            :
            <p>wsgws</p>
            }
            <div className="fixed right-0 top-1/4 text-2xl flex flex-col items-end z-100  md:text-3xl lg:top-2/4 lg:text-3xl">
                {fundacion.facebook != null && fundacion.facebook != '' ? <Redes color='bg-blue-700' red='facebook' url={`https://www.facebook.com/${fundacion.facebook}`} /> : ''}
                {fundacion.whatsapp != null && fundacion.whatsapp != '' ? <Redes color='bg-green-700' red='whatsapp' url={`https://wa.me//57${fundacion.whatsapp}`} /> : ''}
                {fundacion.instagram != null && fundacion.instagram != '' ? <Redes color='bg-pink-600' red='instagram' url={`https://www.instagram.com/${fundacion.instagram}`} /> : ''}
            </div>
        </main>
    )
}

export default Fundacion
