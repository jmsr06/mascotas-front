import { Link } from "react-router-dom";

const Error401 = (props) => {

    return (
        <div className="h-full flex justify-center flex-col items-center">
            <span className="text-red-600 font-bold text-2xl md:text-3xl lg:mt-10">¡Acceso denegado!</span>
            <img className="w-3/4 lg:w-1/2" src='../../public/errores/401.png'/>
            <Link to='/' className="text-lg mb-10 bg-blue-800 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-blue-600">Ir a la página principal</Link>
        </div>
    )
}

export default Error401;
