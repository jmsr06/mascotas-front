import { Link } from "react-router-dom";

const Error404 = (props) => {

    return (
        <div className="h-full flex justify-center flex-col items-center">
            <img className="w-3/4 lg:w-2/5" src='../../public/errores/404.png'/>
            <Link to='/' className="text-lg mb-10 bg-blue-800 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-blue-600">Ir a la página principal</Link>
        </div>
    )
}

export default Error404;
