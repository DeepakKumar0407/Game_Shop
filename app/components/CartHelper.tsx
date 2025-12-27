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
    <div>
        <button onClick={handleCart}>Add to cart</button>
        <button onClick={handleBuy}>Buy Now</button>
    </div>
  )
}
export default CartHelper