"use client"
import Link from "next/link"
import { useEffect } from "react"
const AddressHelper =() => {
    useEffect(()=>{
    fetch("http://localhost:3000/api/user").then(res=>{
        if(!res.ok){
            throw new Error("error")
        }
        return res.json()
    }).then(data=>{
        const {user} = data
    }).catch(err => {
      console.error("Fetch error:", err);
    });
    },[])
  return (
    <div>
        <Link href='/address'>Address</Link>
    </div>
  )
}
export default AddressHelper