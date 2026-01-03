"use client"
import Image from "next/image";
import { GameTypeWithoutDoc } from "../database/game.model";
import Link from "next/link";
import { useState } from "react";
import CartHelper from "./CartHelper";

const GameCard = ({prop}:{prop:any}) => {
    const {game,head} = prop
    const [flag,setFlag] = useState(false)
    const handleHoverIn = ()=>{
      setFlag(true)
    }
     const handleHoverOut = ()=>{
      setFlag(false)
    }
  return (
    <div className="w-full font-robo min-w-full sm:text-sm">
        <div className="relative w-full h-full">
        <Link href={`http://localhost:3000/games/${game.slug}`}>
        <Image src={game.image!} alt="image" width={200} height={100} className="w-full" onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}/>
        </Link> 
        <div className={`div_game_card max-h-0 ease-in-out overflow-hidden transition-[max-height] duration-500 ${flag?"max-h-full":""}`} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
          <Link href={`http://localhost:3000/games/${game.slug}`}>
          <div className="flex flex-col w-full justify-baseline gap-2 ">
          <p className="font-bold lg:text-xl ml-2 mt-2">{game.title}</p>
          <div className="flex justify-between">
          <p className="ml-2">{game.developer}</p>
          <p className="mr-2">{game.releaseDate}</p>
          </div>
          <div className="flex justify-baseline gap-2 ml-2 w-full overflow-clip">
          {game.tags.map((tag:string,index:number)=>(
            <p key={index} className="bg-background/50 p-2 rounded-xl">{tag}</p>
          ))}
          </div>
          <div className="flex justify-baseline gap-2 ml-2 overflow-hidden w-full">
          {game.platform.map((item:string,index:number)=>(
            <p key={index} className="bg-background/50 p-2 rounded-xl">{item}</p>
          ))}
          </div>
          </div>
          </Link>
          <div className="ml-2 mb-2">
            <CartHelper prop={{slug:game.slug,head}}/>
          </div>
        </div>
       </div>
        <div className="w-full flex justify-end">
          <div className="flex justify-around bg-foreground/70 text-white w-1/3">
           <p>Price: ₹{game.price}</p>
        </div>
        </div>
    </div>
  )
}
export default GameCard