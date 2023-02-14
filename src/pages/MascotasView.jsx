import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import mascotasApi from "../api/mascotasApi";
import swal from 'sweetalert';
import Paginador from '../components/Paginador';


export async function loader({ request, params }) {
    const url = new URL(request.url);
    let page = url.searchParams.get("page");
    let dataMascotas = {}
    const fundacion = JSON.parse(localStorage.getItem('user')).fundacion.slug
    try {
        const parametros = {}
        if (url.searchParams.get("page")) {
            parametros.page = url.searchParams.get("page")
        }
        const response = await mascotasApi.get(`/fundacion/mascotas`, {
            params: parametros
        })
        dataMascotas = response.data.data
        dataMascotas.url = `/fundacion/mascotas`
    } catch (error) {
        console.log(error)
    }
    return { dataMascotas }
}

const MascotaView = () => {
    const { dataMascotas } = useLoaderData();
    const [mascotas, setMascotas] = useState(dataMascotas.results)
    const [paginador, setPaginador] = useState(dataMascotas.results)
    const [filteredData, setFilteredData] = useState(dataMascotas.results)

    const [selectedOptionName, setSelectedOptionName] = useState('asc');

    const [page, setPage] = useState(dataMascotas.page)

    useEffect(() => {
        filtrar()
    }, [page])

    const filtrar = async () => {
        const response = await mascotasApi.get(dataMascotas.url, {
            params: {
                page
            }
        })
        setMascotas(response.data.data.results)
    }

    //Función para actualizar la opción seleccionada
    const handleOptionChange = () => {
        if (selectedOptionName == 'asc') {
            setSelectedOptionName('desc');
        }
        else {
            setSelectedOptionName('asc');
        }
    };

    // Ordenar los datos según la opción seleccionada
    filteredData.sort((a, b) => {
        if (selectedOptionName === 'asc') {
            return a.nombre.localeCompare(b.nombre);
        } else {
            return b.nombre.localeCompare(a.nombre);
        }
    });

    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    // Filtrar los datos según filterValue
    useEffect(() => {
        const data = mascotas.filter((mascota) => {
            if (filterValue != '') {
                return mascota.nombre.includes(filterValue)
            }
            return true
        })
        setFilteredData(data)
    }, [filterValue, mascotas])

    const deletePet = (id) => {
        swal({
            title: '¿Deseas eliminar esta mascota?',
            text: 'No podrás recuperar esta publicación!',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Cancelar',
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: 'Si',
                    closeModal: true,
                },
                deny: {
                    text: 'No',
                    closeModal: true,
                },
            },
        }).then((result) => {
            if (result === 'deny') {
                swal('Cancelado', 'La acción ha sido cancelada', 'error');
            }
            else if (result === true) {
                try {
                    mascotasApi.delete(`/eliminarMascota/${id}`)
                    window.location.reload();
                    swal('Eliminada!', 'La publicación ha sido eliminada', 'success');
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }
    return (
        <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-700">
            <div className='flex justify-end '>
                <Link to={'/crear-publicacion'} className='flex r-0 h-10 text-white font-bold bg-blue-700 p-2 rounded-lg hover:bg-blue-500 cursor-pointer'>Publicar nueva mascota</Link>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <input value={filterValue} onChange={handleFilterChange} className='border-2  w-10/12 rounded-lg h-10 p-3' placeholder='Nombre de la mascota' />
            </div>
            <div className='flex flex-col justify-center items-center mt-10 overflow-x-auto whitespace-nowrap'>
                <table className='border w-10/12 mb-3'>
                    <thead className='bg-gray-200 h-10'>
                        <tr >
                            <th >Imagen</th>
                            <th >Nombre {selectedOptionName == 'asc' ? <i onClick={handleOptionChange} className="fa-solid fa-arrow-down-a-z text-blue-700 cursor-pointer hover:text-blue-500"></i> : <i onClick={handleOptionChange} className="fa-solid fa-arrow-down-z-a text-blue-700 cursor-pointer hover:text-blue-500"></i>}</th>
                            <th >Sexo</th>
                            <th >Estado</th>
                            {/* <th >Publicación</th> */}
                            <th >Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ?
                            filteredData.map((mascota) => (
                                <tr key={mascota.id} className='h-32'>
                                    <td className='capitalize mt-2 flex justify-center items-center'>
                                        <img className='h-28 w-28' src={mascota.imagen} />
                                    </td>
                                    <td className='capitalize text-center'>
                                        {mascota.nombre}
                                    </td>
                                    <td className='capitalize text-center'>
                                        {mascota.sexo == 'H' ? 'Hembra' : 'Macho'}
                                    </td>
                                    <td className='capitalize text-center'>
                                        {mascota.estado_id == 1 ? 'Adopción' : (mascota.estado_id == 2 ? 'Perdido' : 'Encontrado')}
                                    </td>
                                    {/* <td className='capitalize text-center'>
                                        {mascota.publicacion == 1 ? <span className='bg-green-200 text-xs font-bold px-2 py-1 rounded-full'>Publicado</span> : <span className='bg-red-200 text-xs font-bold px-2 py-1 rounded-full'>En revisión</span>}
                                    </td> */}
                                    <td className='capitalize text-center'>
                                        <Link to={{
                                            pathname: `/editar-publicacion/${mascota.slug}`
                                        }}><button className='bg-blue-500 h-10 w-14 text-white rounded-lg mr-6 hover:bg-blue-400 cursor-pointer'><i className="fa-solid fa-pen-to-square"></i></button></Link>
                                        <button onClick={() => deletePet(mascota.id)} className='bg-red-500 h-10 w-14 text-white rounded-lg hover:bg-red-400 cursor-pointer'><i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan={6} className='text-center p-3'>No hay resultados</td>
                            </tr>}
                    </tbody>
                </table>
                {dataMascotas.total > 0 && <Paginador paginas={dataMascotas.paginas} total={dataMascotas.total} setPage={setPage} page={page} perPage={dataMascotas.perPage} />
                }
            </div>
        </main>
    )
}

export default MascotaView
