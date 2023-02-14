import { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import CardFlip from "../components/CardFlip";
import Slider from "../components/Slider";
import dataSlider from '../components/dataSlider'
import mascotasApi from "../api/mascotasApi";

export async function loader({ request, params }) {
  let data = []
  try {
      const response = await mascotasApi.get(`/categorias`)
      data = response.data.data
  } catch (error) {
      console.log(error)
  }
  return { data }
}

const index = () => {
  const { data } = useLoaderData();
  const [categorias, setCategorias] = useState(data)

  return (
    <main className="w-full">
      <div className="mb-7 md:mb-0 flex justify-center items-center">
        <Slider width='w-full' height='h-52 md:h-92 lg:h-450' imagenes={dataSlider} />
      </div>
      <div className="md:grid md:grid-cols-3 mt-14">
        {categorias.map((obj) =>
          <CardFlip key={obj.id} tipo={obj.nombre} slug={obj.slug} img={`before:bg-${obj.slug}`} />
        )}
      </div>
    </main>
  );
};

export default index;
