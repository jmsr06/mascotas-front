import React from "react";
const Footer = () => {
    return (
        <footer className="bg-gray-200">
            <div className="py-3 ">
                <h2 className="lg:text-base text-sm font-semibold text-center tracking-wide m-0">NOSOTROS</h2>
                <p className="m-0 lg:text-sm md:text-sm text-center	block text-xs"><a className="no-underline"
                    href="">Términos y condiciones</a></p>
                <p className="m-0 lg:text-sm md:text-sm text-center	block text-xs"><a className="no-underline"
                    href="">Política de privacidad</a></p>
            </div>
            <div className="h-xl justify-center bg-gray-400 leading-5 w-full h-6 ">
                <div className="flex justify-center align-center text-xs  w-full h-full items-center">
                    <i className="fas fa-copyright"></i> Copyright 2023 todos los
                    derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;