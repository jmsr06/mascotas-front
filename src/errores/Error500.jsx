import { Link } from "react-router-dom";

const Error500 = (props) => {

    return (
        <div className="h-full flex justify-center flex-col items-center">
            <img className="w-4/5 lg:w-1/2" src='../../public/errores/500.png'/>
            <Link to='/' className="text-lg mt-5 mb-10 bg-blue-800 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-blue-600">Ir a la página principal</Link>
        </div>
    )
}

export default Error500;
