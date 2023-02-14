import { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { Link } from 'react-router-dom';


const CardFlip = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div onMouseEnter={handleClick} className={`${props.img} mb-2 md:mb-0 before:absolute before:inset-0 before:brightness-75 before:content-[''] before:bg-cover before:bg-center before:z-1 z-5 card-flip relative h-36 md:h-72 flex justify-center items-center text-3xl text-black font-bold`} >
        <p className='z-5 text-black'>
          {props.tipo} <i className=" fa-solid fa-paw"></i>
        </p>
      </div>

      <div onMouseLeave={handleClick} className={`${props.img} before:absolute before:inset-0 before:brightness-50 before:content-[''] before:bg-cover before:bg-center before:z-1 z-5 card-flip relative h-36 md:h-72 flex justify-center items-center text-3xl text-black font-bold`} >
        <Link to={`/estado/adopta?especie=${props.slug}`} className='z-5 border border-white card-flip rounded-md p-4 hover:bg-gray-200 hover:text-black'>
          Adopta
        </Link>
      </div>
    </ReactCardFlip>
  )
}

export default CardFlip
