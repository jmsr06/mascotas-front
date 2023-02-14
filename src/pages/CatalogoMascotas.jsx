import { useState } from 'react'
import { useLoaderData  } from 'react-router-dom';
import Card from '../components/Card'
import Filtros from '../components/Filtros';
import mascotasApi from "../api/mascotasApi";

export async function loader({ request, params }) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("especie");
    let data = []
    const path = request.url.split('/')[4]
    if (!searchTerm) {
        try {
            const response = await mascotasApi.get(`/estados/${path}`)
            data = response.data.data
        } catch (error) {
            console.log(error)
        }
    }
    return { slug: path, data, searchTerm }
}

const CatalogoMascotas = (props) => {
    const { slug, data, searchTerm } = useLoaderData();
    const [item, setItem] = useState(data)
    const [filtro, setFiltro] = useState(false);
    const handleFiltro = () => {
        setFiltro(!filtro);
    }
    const camino = location.pathname.split('/')
    const url = `/estados/${camino[[camino.length - 1]]}`
    return (
        <>
            <div className={`bg-${slug.split('?')[0]} h-40 w-full flex justify-center items-center md:h-80 bg-center bg-cover`}>
                <h1 className=" text-black stroke text-xl w-full uppercase font-black text-center tracking-wide whitespace-nowrap text-ellipsis truncate md:text-3xl">
                    {slug.split('?')[0] }
                </h1>
            </div>

            <div className='w-full flex justify-end'>
                <button onClick={handleFiltro} className='mr-4 cursor-pointer mt-5 border border-gray-800 w-2/6 md:w-3/12 lg:w-1/12 h-9 justify-center flex items-center uppercase gap-2'>
                    <i className="fa-solid fa-filter"></i><p className='text-sm'>Filtros</p>
                </button>
            </div>
            <Filtros url={url} filtro={filtro} setFiltro={setFiltro} searchTerm={searchTerm} setItem={setItem} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
                {item.map((obj) => (
                    <Card key={obj.id} titulo={slug} item={obj} />
                )
                )}
            </div>
        </>
    )
}

export default CatalogoMascotas;
