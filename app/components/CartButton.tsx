'use client'
import { useState } from "react"
import { GameType } from "../database/game.model"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"


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
      <button className="button_add" onClick={()=>addGame(game.slug)}>+</button>
      <button className="button_remove"  onClick={()=>deleteGame(game.slug)}>-</button>
    </div>
  )
}
export default CartButton