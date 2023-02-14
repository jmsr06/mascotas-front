import { Link } from "react-router-dom";

const Error503 = (props) => {

    return (
        <div className="h-full flex justify-center flex-col items-center">
            <img className="w-9/12 lg:w-5/12" src='../../public/errores/503.png'/>
            <Link to='/' className="lg:mb-10 text-lg bg-blue-800 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-blue-600">Ir a la página principal</Link>
        </div>
    )
}

export default Error503;
