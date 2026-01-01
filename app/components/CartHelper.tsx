"use client"

import { redirect } from "next/navigation"

const CartHelper = ({prop}:{prop:any}) => {
    const {slug,head} = prop
    const handleCart=async()=>{
        const res = await fetch("http://localhost:3000/api/cart",{
            method:"POST",
            headers:Object.fromEntries(head.entries()),
            body:slug
        })
    }
     const handleBuy=async()=>{
        const res = await fetch("http://localhost:3000/api/cart",{
            method:"POST",
            headers:Object.fromEntries(head.entries()),
            body:slug
        })
        redirect('/checkout')
    }
  return (
    <div className="flex justify-baseline gap-4">
        <button onClick={handleCart} className="p-1 bg-green-800 hover:bg-green-500 rounded cursor-pointer">Add to cart</button>
        <button onClick={handleBuy} className="p-1 bg-green-800 hover:bg-green-500 rounded cursor-pointer">Buy Now</button>
    </div>
  )
}
export default CartHelper