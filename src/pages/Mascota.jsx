import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import Slider from '../components/Slider'
import mascotasApi from "../api/mascotasApi";

export async function loader({ request, params }) {
    const url = new URL(request.url);
    const path = url.pathname.split('/');
    const searchTerm = path[[path.length - 1]]
    let data = []
    try {
        const response = await mascotasApi.get(`/mascotas/${searchTerm}`)
        data = response.data.data
    } catch (error) {
        console.log(error)
    }
    return { data }
}

const Mascota = () => {
    const { data } = useLoaderData();
    const [mascota, setMascota] = useState(data)

    return (
        <main className="mx-10 my-14 md:grid md:grid-cols-2 md:gap-10">
            <div className="mb-7 md:mb-0 flex justify-center items-center">
                <Slider width='w-72 md:w-450' height='h-72 md:h-450' imagenes={Object.keys(mascota).length == 0 ? [] : mascota.imagenes} />
            </div>
            <div className='grid grid-rows-7 gap-3 md:gap-0 text-gray-700'>
                <span className='text-black uppercase font-bold text-3xl'>{mascota.nombre} </span>
                <span className='capitalize text-sm'>
                    <Link to={`/fundacion/${mascota.fundacion_slug}`} className='underline font-semibold text-blue-700 hover:text-blue-500 cursor-pointer'>{mascota.fundacion}</Link>
                    <p><span className='font-bold'>Teléfono: </span>{mascota.telefono}</p>
                    <span className='text-gray-500'><i className="fa-solid fa-location-dot"></i> {mascota.ciudad} </span>
                </span>
                <span className='capitalize'><span className='font-bold'>Edad:</span> 1 año</span>
                <span className='capitalize'><span className='font-bold'>Tamaño:</span> {mascota.size}</span>
                <span className='capitalize'><span className='font-bold'>Sexo:</span> {mascota.sexo == 'M' ? 'macho' : 'hembra'}</span>
                <span className='capitalize'><span className='font-bold'>Esterilización:</span> {mascota.esterilizacion == '2' ? 'Sí' : 'No'}</span>
                <span className=' capitalize'><span className='font-bold'>Descripción: </span>{mascota.descripcion} </span>
            </div>
        </main>
    )
}

export default Mascota
