import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout';
import Fundacion, {loader as fundacionLoader} from '../components/Fundacion'
import Index, {loader as indexLoader} from '../pages/index';
import CatalogoMascotas, {loader as catalogoMascotasLoader} from '../pages/CatalogoMascotas';
import Mascota, {loader as mascotaLoader} from '../pages/Mascota';
import CrearPublicacion, {loader as crearPublicacionLoader} from '../pages/CrearPublicacion';
import CrearFundacion, {loader as crearFundacionLoader} from '../pages/CrearFundacion';
import MascotaView, {loader as mascotasViewLoader} from '../pages/MascotasView';
import Log from '../components/Log';
import CatalogoFundaciones, {loader as catalogoFundacionesLoader} from '../pages/CatalogoFundaciones';
import Error401 from '../errores/Error503';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index/>,
                loader: indexLoader,
            },
            {
                path: '/acceder',
                element: <Log />,
            },
            {
                path: '/404',
                element: <Error401 />,
            },
            {
                path: '/crear-publicacion',
                element: <CrearPublicacion/>,
                loader: crearPublicacionLoader,
            },
            {
                path: '/estado/:slug',
                element: <CatalogoMascotas />,
                loader: catalogoMascotasLoader,
            },
            {
                path: '/:slug/mascota/:slugMascota',
                element: <Mascota />,
                loader: mascotaLoader,
            },
            {
                path: '/fundaciones',
                element: <CatalogoFundaciones/>,
                loader: catalogoFundacionesLoader,
            },
            {
                path: 'fundacion/:slugFundacion',
                element: <Fundacion />,
                loader: fundacionLoader,
            },
            {
                path: '/crear-fundacion',
                element: <CrearFundacion/>,
                loader: crearFundacionLoader,
            },
            {
                path: '/editar-fundacion/:slugFundacion',
                element: <CrearFundacion/>,
                loader: crearFundacionLoader,
            },
            {
                path: '/fundacion/ver-mascotas',
                element: <MascotaView/>,
                loader: mascotasViewLoader,
            },
            {
                path: '/editar-publicacion/:slugMascota',
                element: <CrearPublicacion/>,
                loader: crearPublicacionLoader,
            },
        ]
    },

])

export default router;