import Image from "next/image";
import Link from "next/link";
import { CartType } from "../database/cart.model";

const GameCardLong = ({game,flag}:{game:CartType & {count:number},flag:boolean}) => {
  return (
    <div className="w-full">
     <Link href={`http://localhost:3000/games/${game.slug}`}>
     <div className="w-full flex justify-baseline lg:gap-40 md:gap-20 gap-2">
        <Image src={game.image!} alt="image" width={150} height={75}/>
        <div className="flex flex-col justify-baseline gap-6 mt-2 mb-2 w-2/3">
            <p>{game.title}</p>
            <p>{game.releaseDate}</p>
        </div>
        <div className="flex flex-col justify-baseline gap-6 mt-2 mb-2 w-2/3">
            <p>Price: {game.price}</p>
            <p>{flag&& `Total: ${game.count}`}</p>
        </div>
        </div>
     </Link>
    </div>
  )
}
export default GameCardLong