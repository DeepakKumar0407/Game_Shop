import Image from "next/image";
import { GameType } from "../database/game.model";
import Link from "next/link";

const GameCard = ({prop}:{prop:any}) => {
    const game = prop
   

  return (
    <div className="p-3 bg-green-700 border-2 border-red-700 w-1/3">
        <Link href="/">
        <Image src="https://res.cloudinary.com/dh2si3c4g/image/upload/v1766401047/game/lnrrxpj8qmsrnsi3gl78.jpg" alt="image" width={200} height={100} className="w-full h-50" />
        <h2>{game.title}</h2>
        <p>Developer: {game.developer}</p>
        <p>Producer: {game.producer}</p>
        <p>Price: {game.price}</p>
        <div className="flex justify-baseline gap-2">
            {game.tags.map((tag:string)=>(
                <p key={tag}>{tag}</p>
            ))}
        </div>
        <div className="flex justify-baseline gap-2">
            {game.platform.map((plat:string)=>(
                <p key={plat}>{plat}</p>
            ))}
        </div> 
        </Link> 
    </div>
  )
}
export default GameCard