import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import Card from '../components/Card'
import mascotasApi from "../api/mascotasApi";

export async function loader() {
    let data = []
    try {
        const response = await mascotasApi.get(`/fundaciones`)
        data = response.data.data
    } catch (error) {
        console.log(error)
    }
    return { data }
}

const CatalogoFundaciones = (props) => {
    const { data } = useLoaderData();
    const [item, setItem] = useState(data)
    return (
        <>
            <div className={`bg-fundaciones h-40 w-full flex justify-center items-center md:h-80 bg-center bg-cover`}>
                <h1 className=" text-black stroke text-xl w-full uppercase font-black text-center tracking-wide whitespace-nowrap text-ellipsis truncate md:text-3xl">
                    fundaciones
                </h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
                {item.map((obj) => (
                    <Card key={obj.id} titulo={'fundaciones'} item={obj} />
                )
                )}
            </div>
        </>
    )
}

export default CatalogoFundaciones;
