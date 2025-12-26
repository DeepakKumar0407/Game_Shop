import Image from "next/image";
import { GameType, GameTypeWithoutDoc } from "../database/game.model";
import Link from "next/link";

const GameCard = ({prop}:{prop:GameTypeWithoutDoc}) => {
    const game = prop

  return (
    <div className="w-full">
        <Link href={`http://localhost:3000/games/${game.slug}`}>
        <Image src={game.image!} alt="image" width={200} height={100} className="w-full h-60"/>
       
        <div className="flex justify-end ">
           <p>Price: ₹{game.price}</p>
        </div>
        </Link> 
    </div>
  )
}
export default GameCard