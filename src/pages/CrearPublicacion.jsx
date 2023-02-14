import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import mascotasApi from "../api/mascotasApi";
import swal from 'sweetalert';
import Info from '../components/Info';

export async function loader({ request }) {
    let dataEdades = []
    let dataCategorias = []
    let dataSizes = []
    let dataEstados = []
    let dataCiudades = []
    let mascota = {}
    const path = request.url.split('/')[3]
    try {
        if (path == 'editar-publicacion') {
            const slug_mascota = request.url.split('/')[4]
            const result = await mascotasApi.get(`/mascotas/${slug_mascota}`)
            mascota = result.data.data
        }

        localStorage.setItem('imagenes', '[]')
        const mascotasEdades = localStorage.getItem('mascotas_edades')
        if (!mascotasEdades) {
            const respEdades = await mascotasApi.get(`/edades`)
            dataEdades = respEdades.data.data
            localStorage.setItem('mascotas_edades', JSON.stringify(dataEdades))
        } else {
            dataEdades = JSON.parse(mascotasEdades)
        }

        const mascotasCategorias = localStorage.getItem('mascotas_categorias')
        if (!mascotasCategorias) {
            const respCategorias = await mascotasApi.get(`/categorias`)
            dataCategorias = respCategorias.data.data
            localStorage.setItem('mascotas_categorias', JSON.stringify(dataCategorias))
        } else {
            dataCategorias = JSON.parse(mascotasCategorias)
        }

        const mascotasSizes = localStorage.getItem('mascotas_sizes')
        if (!mascotasSizes) {
            const respSizes = await mascotasApi.get(`/sizes`)
            dataSizes = respSizes.data.data
            localStorage.setItem('mascotas_sizes', JSON.stringify(dataSizes))
        } else {
            dataSizes = JSON.parse(mascotasSizes)
        }

        const mascotasEstados = localStorage.getItem('mascotas_estados')
        if (!mascotasEstados) {
            const respEstados = await mascotasApi.get(`/estados`)
            dataEstados = respEstados.data.data
            localStorage.setItem('mascotas_estados', JSON.stringify(dataEstados))
        } else {
            dataEstados = JSON.parse(mascotasEstados)
        }

        const mascotasCiudades = localStorage.getItem('mascotas_ciudades')
        if (!mascotasCiudades) {
            const respCiudades = await mascotasApi.get(`/ciudades`)
            dataCiudades = respCiudades.data.data
            localStorage.setItem('mascotas_ciudades', JSON.stringify(dataCiudades))
        } else {
            dataCiudades = JSON.parse(mascotasCiudades)
        }
    } catch (error) {
        console.log(error)
    }
    return { mascota, dataEdades, dataCategorias, dataSizes, dataEstados, dataCiudades, path }
}

const CrearPublicacion = () => {
    const { mascota, dataEdades, dataCategorias, dataSizes, dataEstados, dataCiudades, path } = useLoaderData();
    const [edades, setEdades] = useState(dataEdades)
    const [categorias, setCategorias] = useState(dataCategorias)
    const [sizes, setSizes] = useState(dataSizes)
    const [estados, setEstados] = useState(dataEstados)
    const [ciudades, setCiudades] = useState(dataCiudades)

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [edad, setEdad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [size, setSize] = useState('')
    const [sexo, setSexo] = useState('')
    const [esterilizacion, setEsterilizacion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [imagenes, setImagenes] = useState([])
    const [estado, setEstado] = useState('')

    useEffect(() => {
        if (path == 'editar-publicacion' && Object.keys(mascota).length > 0) {
            setNombre(mascota.nombre)
            setDescripcion(mascota.descripcion)
            setEdad(mascota.edad_id)
            setCategoria(mascota.categoria_id)
            setSize(mascota.size_id)
            setSexo(mascota.sexo)
            setEsterilizacion(mascota.esterilizacion)
            setCiudad(mascota.ciudad_id)
            setImagenes(mascota.imagenes.map((img) => img.url))
            setEstado(mascota.estado_id)
        }
    }, [mascota])


    const handleFileChange = (event) => {
        const accept = ["image/png", "image/jpeg", "image/jpg"]
        if (event.target.files[0].size >= 1000000) {
            return swal({
                position: 'center',
                icon: 'error',
                title: 'Debes adjuntar imágenes con tamaño inferiror a 1 MB',
                timer: 4500,
            });
        }
        let files = [...event.target.files]
        files = files.filter((file) => {
            return accept.includes(file.type)
        })
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = (event) => {
                const images = [...imagenes]
                images.push(reader.result)
                setImagenes(images)
                const imgs = JSON.parse(localStorage.getItem('imagenes') || '[]')
                imgs.push(event.target.result)
                localStorage.setItem('imagenes', JSON.stringify(imgs));
            }
            reader.readAsDataURL(file);
        })
    };

    const deleteImagen = (index) => {
        const imgs = JSON.parse(localStorage.getItem('imagenes'))
        localStorage.setItem('imagenes', JSON.stringify(imgs.filter((imgs, i) => index != i)))
        setImagenes(imagenes.filter((imgs, i) => index != i))
    }

    async function handleSubmit(e) {
        const fundacion = JSON.parse(localStorage.getItem('user')).fundacion
        e.preventDefault()
        const post = {
            id: mascota.id,
            nombre: nombre,
            sexo: sexo,
            descripcion: descripcion,
            esterilizacion: esterilizacion,
            categoria_id: categoria,
            size_id: size,
            edad_id: edad,
            ciudad_id: ciudad,
            fundacion_id: fundacion.id,
            estado_id: estado,
            imagenes: imagenes
        }
        if (path == 'editar-publicacion') {
            try {
                const res = await mascotasApi.put(`/mascotas/${mascota.id}`, post)
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La publicación ha sido modificada',
                    timer: 4500,
                });
                window.location.href = '/fundacion/ver-mascotas';
            } catch (error) {
                console.log(error)
                swal({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Hubo un error al modificar la publicación',
                    timer: 4500,
                });
            }
        } else {
            try {
                const res = await mascotasApi.post('/mascotasStore', post)
                e.target.reset();
                setNombre('')
                setDescripcion('')
                setEdad('')
                setCategoria('')
                setSize('')
                setSexo('')
                setEsterilizacion('')
                setCiudad('')
                setImagenes([])
                setEstado('')
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La publicación ha sido creada',
                    timer: 4500,
                });
                window.location.href = '/fundacion/ver-mascotas';
            } catch (error) {
                console.log(error)
                swal({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Hubo un error al crear la publicación',
                    timer: 4500,
                });
            }
        }
    }

    const infoEdad = ['Cachorro: 0 a 1 año', 'Joven: 1 a 2 años', 'Adulto: 2 a 7 años', 'Senior: 7 años o más']

    switch (path == 'editar-publicacion' && sexo) {
        case 'M':
            document.getElementById("sexo_M").checked = true;
            break;
        case 'H':
            document.getElementById("sexo_H").checked = true;
            break;
        default:
            break;
    }

    if (path == 'editar-publicacion' && esterilizacion == 1) {
        document.getElementById("esterilizacion_1").checked = true;
    }
    if (path == 'editar-publicacion' && esterilizacion == 2) {
        document.getElementById("esterilizacion_2").checked = true;
    }

    return (
        <form onSubmit={handleSubmit} className=' bg-gray-200 shadow-md rounded-md mx-auto my-10 py-10 px-5 w-4/5 md:w-2/3 lg:w-1/2'>
            <h1 className='text-blue-900 text-center my-6 font-bold text-2xl'>Crea tu publicación <i className="fa-solid fa-paw"></i></h1>
            <div className='p-6 mb-4 bg-white rounded-lg shadow-xl'>
                <h2 className="mb-4 md:mb-10 text-lg font-bold text-center uppercase">Datos de la mascota</h2>
                <div className='md:grid md:grid-cols-2 md:gap-6'>
                    <div className='mb-4'>
                        <label htmlFor='nombre' className='text-gray-700 font-semibold'>Nombre:*</label>
                        <input id='nombre'
                            type='text'
                            name="nombre"
                            placeholder='Nombre de la mascota'
                            value={nombre}
                            onChange={event => setNombre(event.target.value)}
                            className=' mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-700 font-semibold'>
                            Edad:*
                            <Info info={infoEdad} />
                        </label>
                        <select id='edad'
                            name="edad"
                            value={edad}
                            onChange={event => setEdad(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md'>
                            <option value="...">...</option>
                            {edades.map((obj) => (
                                <option className='capitalize' key={obj.id} value={obj.id}>{obj.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='categoria' className='text-gray-700 font-semibold'>Especie:*</label>
                        <select id='categoria'
                            name="categoria"
                            value={categoria}
                            onChange={event => setCategoria(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md'>
                            <option value="...">...</option>
                            {categorias.map((obj) => (
                                <option className='capitalize' key={obj.id} value={obj.id}>{obj.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='size' className='text-gray-700 font-semibold'>Tamaño:*</label>
                        <select id='size'
                            name="size"
                            value={size}
                            onChange={event => setSize(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md'>
                            <option value="...">...</option>
                            {sizes.map((obj) => (
                                <option className='capitalize' key={obj.id} value={obj.id}>{obj.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='sexo' className='text-gray-700 font-semibold block'>Sexo:*</label>
                        <input id='sexo_H'
                            name="sexo"
                            type='radio'
                            className='mr-1'
                            value='H'
                            // {path == 'editar-publicacion' && sexo == 'H' && checked={true}}
                            // checked={path == 'editar-publicacion' && sexo == 'H' && true}
                            onChange={event => setSexo(event.target.value)}
                        />Hembra
                        <input id='sexo_M'
                            name="sexo"
                            type='radio'
                            className='ml-6 mr-1'
                            value='M'
                            // {...path == 'editar-publicacion' && sexo == 'M' && checked}
                            // checked={path == 'editar-publicacion' && sexo == 'M' && true }
                            onChange={event => setSexo(event.target.value)}
                        />Macho
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='esterilizacion' className='text-gray-700 font-semibold block'>Esterilizad@:*</label>
                        <input id='esterilizacion_2'
                            name="esterilizacion"
                            type='radio'
                            className='mr-1'
                            value='2'
                            onChange={event => setEsterilizacion(event.target.value)}
                        />Sí
                        <input id='esterilizacion_1'
                            name="esterilizacion"
                            type='radio'
                            className='ml-6 mr-1'
                            value='1'
                            onChange={event => setEsterilizacion(event.target.value)}
                        />No
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='estados' className='text-gray-700 font-semibold'>Estado:*</label>
                        <select id='estado'
                            name="estado"
                            value={estado}
                            onChange={event => setEstado(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md'>
                            <option value="...">...</option>
                            {estados.map((obj) => (
                                <option className='capitalize' key={obj.id} value={obj.id}>{obj.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='ciudad' className='text-gray-700 font-semibold'>Ciudad:*</label>
                        <select id='ciudad'
                            name="ciudad"
                            value={ciudad}
                            onChange={event => setCiudad(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md'>
                            <option value="...">...</option>
                            {ciudades.map((obj) => (
                                <option key={obj.id} value={obj.id}>{obj.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='descripcion' className='text-gray-700 font-semibold'>Descripcion:</label>
                        <textarea id='descripcion'
                            name="descripcion"
                            type='text'
                            placeholder='Descripcion de la mascota'
                            value={descripcion}
                            onChange={event => setDescripcion(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md h-max'></textarea>
                    </div>
                </div>
            </div>
            <section className="p-6 mb-4 bg-white rounded-lg shadow-xl relative">
                <h2 className="mb-2 text-xl font-semibold text-center">Subir imágenes</h2>
                <div className=' w-full flex flex-row justify-center items-center'>
                    {imagenes.length < 5 ?
                        <><input accept="image/png, image/jpeg, image/jpg" id='input-imagenes' className='cursor-pointer relative opacity-0 z-5 w-0 h-full' type="file" multiple onChange={handleFileChange} />
                            <label htmlFor='input-imagenes' className=" w-2/3 z-1 hover:opacity-90 cursor-pointer flex justify-center items-center mt-1 mb-4 border-2 border-gray-300 border-dashed rounded-md h-16">
                                <i className="cursor-pointer fa-regular fa-images text-3xl text-gray-500"></i>
                            </label></>
                        :
                        <span className='flex justify-center items-center h-10 w-full text-sm bg-red-700 font-bold text-white'>Haz alcanzado el límite de imágenes</span>
                    }

                </div>
                <span className="text-xs font-semibold text-yellow-600"><i className="fas fa-exclamation-triangle"></i> Puedes
                    adjuntar máximo 5 imágenes de esta mascota</span>
            </section>
            <section className="p-6 mb-4 bg-white rounded-lg shadow-xl">
                <h2 className="mb-2 text-xl font-semibold text-center">Imagenes de la mascota</h2>
                <div className='flex gap-2 w-full flex-wrap justify-center'>
                    {imagenes != '' ?
                        imagenes.map((img, index) => (<div key={index} className='relative'>
                            <img className="object-cover object-top w-32 h-32" src={img} alt="" />
                            <button onClick={(e) => { e.preventDefault(); deleteImagen(index) }} className='absolute right-2 top-2 h-6 w-6 bg-red-500 cursor-pointer hover:bg-red-300 rounded-full flex justify-center items-center'><i className="fa-solid fa-xmark text-white"></i></button>
                        </div>
                        ))
                        :
                        <span className='text-sm text-gray-600'>No existen imágenes aún</span>}
                </div>
            </section>
            <input className='w-full uppercase bg-indigo-800 cursor-pointer text-white font-bold py-2 mt-6 hover:bg-indigo-600 rounded-md'
                type='submit'
                value={path == 'editar-publicacion' ? 'Modificar publicación' : 'Crear publicación'}
            />
        </form>
    )
}

export default CrearPublicacion
