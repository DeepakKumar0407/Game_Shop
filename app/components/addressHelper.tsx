"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { UserType } from "../database/user.model"
import { useSession } from "next-auth/react"
const AddressHelper =() => {
  const [user,setUser] = useState<UserType>()
  const {data:session} = useSession() 
  useEffect(()=>{
    const getUser = async ()=>{
      const res = await fetch("http://localhost:3000/api/user")
      const {user} = await res.json()
      setUser(user)
    }
    getUser()
  },[])
  console.log(user?.address?.length)
    return (
    <Link href='/address' className="w-2/10 flex items-center">
    {session?(
      <div className="w-full">
      {user?.address?.length?(<p className="p_address_helper">{user?.address?.[0]?.flat+","}{user?.address?.[0]?.street+","}{user?.address?.[0]?.city}</p>):(<p className="font-bold text-white">Edit Address</p>)}
    </div>
    ):("")}
    </Link>
  )
  }
export default AddressHelper