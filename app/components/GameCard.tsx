import Image from "next/image";
import { GameType, GameTypeWithoutDoc } from "../database/game.model";
import Link from "next/link";

const GameCard = ({prop}:{prop:GameTypeWithoutDoc}) => {
    const game = prop

  return (
    <div className="w-full">
        <Link href={`http://localhost:3000/games/${game.slug}`}>
        <div className="relative">
        <Image src={game.image!} alt="image" width={200} height={100} className="w-full"/>
        <div className="bg-red-700 absolute bottom-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:h-full transition-all duration-300 ease-in-out">
          <p>{game.title}</p>
          <p>{game.developer}</p>
          <p>{game.releaseDate}</p>
          <div className="flex justify-baseline gap-2">
          {game.tags.map((tag,index)=>(
            <p  key={index}>{tag}</p>
          ))}
          </div>
          <div className="flex justify-baseline gap-2">
          {game.platform.map((item,index)=>(
            <p  key={index}>{item}</p>
          ))}
          </div>
        </div>
       </div>
        <div className="flex justify-end ">
           <p>Price: ₹{game.price}</p>
        </div>
        </Link> 
    </div>
  )
}
export default GameCard