"use client"
import React, { useState } from "react"
import { UserAddress } from "../database/user.model"
import { GameType } from "../database/game.model"

const CheckoutForm = ({prop}:{prop:any}) => {
    const {user,games,totalPrice} = prop
    const userAddress = user.address
    const initialAddress:UserAddress = {
    flat:"",
    street:"",
    area:"",
    city:"",
    state:"",
    country:"",
    pincode:""
  }

    const totalGames:{}[] = []
    const [address,setAddress] = useState(initialAddress)
    const [game,setGame] = useState(totalGames)
    const [time,setTime] = useState('8 AM to 12 PM')
    const [payment,setPayment] = useState('Cash')
    const [flag,setFlag] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const[submitted,setSubmitted] = useState(false)
    games.map((game:GameType & {count:number})=>{
      const newGame = 
      { title:game.title,
        slug:game.slug!,
        count:game.count,
        price:game.price}
      totalGames.push(newGame)
    })
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setSubmitted(false)
      setIsLoading(true)
      const order = {
        userId:user._id,
        games:game,
        address:address,
        time:time,
        payment:payment,
        totalPay:totalPrice
      }
      const res = await fetch('http://localhost:3000/api/order',{
        method:'POST',
        body:JSON.stringify(order)
      })
      setIsLoading(false)
      setSubmitted(true)
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-baseline gap-4">
            <select name="address" onChange={(e)=>{setAddress(userAddress[e.target.value]);setFlag(false)}} className="border-2 border-foreground rounded p-3" required>
            <option className="hidden" value={'1'}>Address</option>
            {userAddress.map((address:UserAddress & {_id:any},index:number)=>(
              <option value={index} key={address._id} className="text-black">{Object.values(address).slice(0,6).join(',')}</option>
            ))}
            </select>
            <select name="time" onChange={(e)=>setTime(e.target.value)} className="border-2 border-foreground rounded p-3" required>
            <option className="text-black" value={'8 AM to 12 PM'}>8 AM to 12 PM</option>
            <option className="text-black" value={'12 PM to 4 PM'}>12 PM to 4 PM</option>
            <option className="text-black" value={'4 PM to 8 PM'}>4 PM to 8 PM</option>
            <option className="text-black" value={'8 PM to 12 AM'}>8 PM to 12 AM</option>
            </select>
            <select name="payment"onChange={(e)=>setPayment(e.target.value)} className="border-2 border-foreground rounded p-3" required>
            <option className="text-black" value={"Cash"}>Cash on Delivery</option>
            <option className="text-black" value={"UPI"}>UPI</option>
            </select>
            <p className="text-sm md:text-xl">Grand Total: {totalPrice}</p>
            {flag||totalGames.length===0?<button type="submit" disabled className="w-1/3 bg-gray-600 p-3 self-center rounded line-through" >Buy</button>:<button type="submit" className="w-1/3 bg-green-800 hover:bg-green-500 p-3 self-center rounded cursor-pointer">Buy</button>}
            {flag&&<p className="text-xs">Please select the address</p>}
            <p>{submitted&&"Order Placed"}{isLoading&&"Loading..."}</p>  
        </form>
    </div>
  )
}
export default CheckoutForm