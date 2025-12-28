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
        <form onSubmit={handleSubmit}>
            <select name="address" onChange={(e)=>{setAddress(userAddress[e.target.value]);setFlag(false)}} required>
            <option className="hidden" value={'1'}>Address</option>
            {userAddress.map((address:UserAddress & {_id:any},index:number)=>(
              <option value={index} key={address._id}>{Object.values(address).slice(0,6).join(',')}</option>
            ))}
            </select>
            <select name="time" onChange={(e)=>setTime(e.target.value)} required>
            <option value={'8 AM to 12 PM'}>8 AM to 12 PM</option>
            <option value={'12 PM to 4 PM'}>12 PM to 4 PM</option>
            <option value={'4 PM to 8 PM'}>4 PM to 8 PM</option>
            <option value={'8 PM to 12 AM'}>8 PM to 12 AM</option>
            </select>
            <select name="payment"onChange={(e)=>setPayment(e.target.value)} required>
            <option value={"Cash"}>Cash on Delivery</option>
            <option value={"UPI"}>UPI</option>
            </select>
            {flag?<button type="submit" disabled >Submit</button>:<button type="submit">Submit</button>}
            {flag&&<p>Please select the address</p>}
            <p>{submitted&&"Order Placed"}{isLoading&&"Loading..."}</p>  
        </form>
    </div>
  )
}
export default CheckoutForm