import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
import mascotasApi from "../api/mascotasApi";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export async function loader({ request, params }) {
    let dataCiudades = []
    let fundacion = {}
    const path = request.url.split('/')[3]
    try {
        if (path == 'editar-fundacion') {
            const slug_fundacion = request.url.split('/')[4]
            const result = await mascotasApi.get(`/fundaciones/${slug_fundacion}`)
            fundacion = result.data.data
        }
        const response = await mascotasApi.get(`/ciudades`)
        dataCiudades = response.data.data
    } catch (error) {
        console.log(error)
    }
    return { fundacion, dataCiudades, path }
}

const CrearFundacion = () => {
    const navigate = useNavigate();
    const { fundacion, dataCiudades, path } = useLoaderData();
    const [ciudades, setCiudades] = useState(dataCiudades)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [logo, setLogo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState(0)
    const [email, setEmail] = useState('')
    const [facebook, setFacebook] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [instagram, setInstagram] = useState('')
    const [ciudad, setCiudad] = useState('')

    useEffect(() => {
        if (path == 'editar-fundacion' && Object.keys(fundacion).length > 0) {
            setNombre(fundacion.nombre)
            setDescripcion(fundacion.descripcion)
            setLogo(fundacion.logo)
            setDireccion(fundacion.direccion)
            setTelefono(fundacion.telefono)
            setEmail(fundacion.email)
            setFacebook(fundacion.facebook)
            setWhatsapp(fundacion.whatsapp)
            setInstagram(fundacion.instagram)
            setCiudad(fundacion.ciudad_id)
        }
    }, [fundacion])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (event) => {
            setLogo(reader.result)
            localStorage.setItem('logo', event.target.result);
        }
        reader.readAsDataURL(file);
    };
    const resetLogo = () => {
        setLogo('')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let usuario = localStorage.getItem('user')
        usuario = JSON.parse(usuario)
        const post = {
            id: fundacion.id,
            nombre: nombre,
            descripcion: descripcion,
            logo: logo,
            direccion: direccion,
            telefono: telefono,
            email: email,
            facebook: facebook,
            whatsapp: whatsapp,
            instagram: instagram,
            user_id: usuario.id,
            ciudad_id: ciudad
        }
        if (path == 'editar-fundacion') {
            try {
                const res = await mascotasApi.put(`/fundaciones/${fundacion.id}`, post)
                usuario.fundacion = res.data.data
                localStorage.setItem('user', JSON.stringify(usuario))
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La fundaci??n ha sido modificada',
                    timer: 4500,
                });
                navigate(`/fundacion/${fundacion.slug}`);
            } catch (error) {
                console.log(error)
                swal({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Hubo un error al modificar la fundacion',
                    timer: 4500,
                });
            }
        } else {
            try {
                const res = await mascotasApi.post('/fundacionStore', post)
                e.target.reset();
                setNombre('')
                setDescripcion('')
                setLogo('')
                setDireccion('')
                setTelefono(0)
                setEmail('')
                setFacebook('')
                setWhatsapp('')
                setInstagram('')
                setCiudad('')
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La fundaci??n ha sido creada',
                    timer: 4500,
                });
                navigate(`/fundacion/${usuario.fundacion.slug}`);
            } catch (error) {
                console.log(error)
                swal({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Hubo un error al crear la fundaci??n',
                    timer: 4500,
                });
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className=' bg-gray-200 shadow-md rounded-md mx-auto my-10 py-10 px-5 w-4/5 md:w-2/3 lg:w-1/2'>
            <h1 className='text-blue-900 text-center my-6 font-bold text-2xl'>Crea tu fundaci??n <i className="fa-solid fa-paw"></i></h1>
            <div className='p-6 mb-4 bg-white rounded-lg shadow-xl'>
                <h2 className="mb-4 md:mb-10 text-lg font-bold text-center uppercase">Datos de la fundaci??n</h2>
                <div className='md:grid md:grid-cols-2 md:gap-6'>
                    <div className='mb-4'>
                        <label htmlFor='nombre' className='text-gray-700 font-semibold'>Nombre:*</label>
                        <input id='nombre'
                            type='text'
                            name="nombre"
                            placeholder='Nombre de la fundacion'
                            value={nombre}
                            onChange={event => setNombre(event.target.value)}
                            className=' mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='direccion' className='text-gray-700 font-semibold'>Direcci??n:</label>
                        <input id='direccion'
                            type='text'
                            name="direccion"
                            placeholder='Direccion de la fundaci??n'
                            value={direccion}
                            onChange={event => setDireccion(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='telefono' className='text-gray-700 font-semibold'>Telefono:*</label>
                        <input id='telefono'
                            type='text'
                            name="telefono"
                            placeholder='Telefono de la fundaci??n'
                            value={telefono}
                            onChange={event => setTelefono(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='text-gray-700 font-semibold'>Email:*</label>
                        <input id='email'
                            type='text'
                            name="email"
                            placeholder='Email de la fundaci??n'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='facebook' className='text-gray-700 font-semibold'>Enlace a facebook:</label>
                        <input id='facebook'
                            type='text'
                            name="facebook"
                            placeholder='Facebook de la fundaci??n'
                            value={facebook}
                            onChange={event => setFacebook(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='whatsapp' className='text-gray-700 font-semibold'>N??mero de whatsapp:</label>
                        <input id='whatsapp'
                            type='number'
                            name="whatsapp"
                            placeholder='Whatsapp de la fundaci??n'
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='instagram' className='text-gray-700 font-semibold'>Usuario de instagram:</label>
                        <input id='instagram'
                            type='text'
                            name="instagram"
                            placeholder='Instagram de la fundaci??n'
                            value={instagram}
                            onChange={event => setInstagram(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='ciudad' className='text-gray-700 font-semibold'>Ciudad:</label>
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
                            placeholder='Descripcion de la fundaci??n'
                            value={descripcion}
                            onChange={event => setDescripcion(event.target.value)}
                            className='mt-2 block w-full p-2 bg-gray-200 rounded-md h-max'></textarea>
                    </div>
                    <div className='md:mb-4 relative'>
                        <label className='text-gray-700 font-semibold '>Logo de la fundaci??n:</label>
                        {logo.split('/').length > 4 ?
                            <div className='w-full h-full flex items-center justify-center'>
                                <img className='mt-2 h-24' src={logo} alt="" />
                                <button onClick={resetLogo} className='ml-2 h-6 w-6 bg-red-500 cursor-pointer top-0 hover:bg-red-300 rounded-full flex justify-center items-center'><i className="fa-solid fa-xmark text-white"></i></button>
                            </div>
                            :
                            <div className='w-full h-24 cursor-pointer'>
                                <input className='cursor-pointer relative text-right opacity-0 z-5 w-full h-full' type="file" onChange={handleFileChange} />,
                                <div className="absolute top-7 left-0 w-full z-1 hover:opacity-90 cursor-pointer flex justify-center items-center mt-1 mb-4 border-2 border-gray-300 border-dashed rounded-md h-16">
                                    <i className="cursor-pointer fa-regular fa-images text-3xl text-gray-500"></i>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
            <input className='w-full uppercase bg-indigo-800 cursor-pointer text-lg text-white font-bold py-2 mt-6 hover:bg-indigo-600 rounded-md'
                type='submit'
                value={path == 'editar-fundacion' ? 'Modificar fundaci??n' : 'Crear fundaci??n'} />
        </form>
    )
}

export default CrearFundacion
