"use client"
import { useState } from "react"

const CheckoutForm = () => {
    const [address,setAddress] = useState('')
    const [time,setTime] = useState('')
    const [payment,setPayment] = useState('')
    console.log(address,time,payment)
  return (
    <div>
        <form>
            <select name="address" onChange={(e)=>setAddress(e.target.value)}>
            <option value={"address"}>address</option>
            <option value={"address"}>address</option>
            </select>
            <select name="time" onChange={(e)=>setTime(e.target.value)}>
            <option value={'time'}>time</option>
            <option value={'night'}>night</option>
            </select>
            <select name="payment"onChange={(e)=>setPayment(e.target.value)} >
            <option value={"payment"}>payment method</option>
            </select>
        </form>
    </div>
  )
}
export default CheckoutForm