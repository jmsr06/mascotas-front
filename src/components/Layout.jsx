import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

    return (
        <div className="grid grid-cols-1 grid-rows-layout min-h-screen">
            <Header />
            <main className='w-full overflow-auto'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
