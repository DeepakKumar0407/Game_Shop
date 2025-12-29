import Image from "next/image";
import Link from "next/link";
import { CartType } from "../database/cart.model";

const GameCardLong = ({game,flag}:{game:CartType & {count:number},flag:boolean}) => {
  return (
    <div className="w-9/10">
     <Link href={`http://localhost:3000/games/${game.slug}`}>
     <div className="w-full flex justify-around">
        <Image src={game.image!} alt="image" width={150} height={75}/>
        <div className="flex flex-col justify-baseline">
            <p>{game.title}</p>
            <p>{game.releaseDate}</p>
        </div>
        <div className="flex flex-col justify-baseline">
            <p>Price: {game.price}</p>
            <p>{flag&& `Total: ${game.count}`}</p>
        </div>
        </div>
     </Link>
    </div>
  )
}
export default GameCardLong