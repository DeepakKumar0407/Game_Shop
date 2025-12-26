'use client'

import { useState } from "react"
import { GameType } from "../database/game.model"

const CartButton = ({prop}:{prop:GameType & {count:number}}) => {
    const game = prop
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
      body:slug
    })
    setCount(count=>count+1)
    game.count = count
  }
 
  return (
    <div>
      <button onClick={()=>deleteGame(game.slug)}>D</button>
      <p>Total: {count}</p>
      <button onClick={()=>addGame(game.slug)}>A</button>
    </div>
  )
}
export default CartButton