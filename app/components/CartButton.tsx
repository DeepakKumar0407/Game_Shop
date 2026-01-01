'use client'

import { useState } from "react"
import { GameType } from "../database/game.model"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import { PlusIcon } from "@heroicons/react/24/solid"
import { MinusIcon } from "@heroicons/react/24/solid"

const CartButton = ({game,head}:{game:GameType & {count:number},head:ReadonlyHeaders}) => {
    const [count,setCount] = useState(game.count)
    const deleteGame = async (slug:string|undefined)=>{
    const res = await fetch("http://localhost:3000/api/cart",{
      method:"DELETE",
      body:slug
    })
    setCount(count=>count-1)
    if(count<=0){
    setCount(0)
    }
    game.count = count
  }
   const addGame = async (slug:string|undefined)=>{
    const res = await fetch("http://localhost:3000/api/cart",{
      method:"POST",
      headers:Object.fromEntries(head.entries()),
      body:slug
    })
    setCount(count=>count+1)
    game.count = count
  }
 
  return (
    <div className="flex flex-col gap-2 justify-baseline">
      <p>Total: {count}</p>
      <button className=" bg-green-800 hover:bg-green-500 rounded cursor-pointer text-center" onClick={()=>addGame(game.slug)}>+</button>
      <button className=" bg-foreground/50 hover:bg-foreground rounded cursor-pointer text-center"  onClick={()=>deleteGame(game.slug)}>-</button>
    </div>
  )
}
export default CartButton