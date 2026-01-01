"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { UserType } from "../database/user.model"
import { useSession } from "next-auth/react"
const AddressHelper =() => {
  const {data:session} = useSession()
  const [user,setUser] = useState<UserType>() 
  useEffect(()=>{
    const getUser = async ()=>{
      const res = await fetch("http://localhost:3000/api/user")
      const {user} = await res.json()
      setUser(user)
    }
    getUser()
  },[])
  if (!session) {
    return(
    <div className="w-2/10 ">
    </div>
   )
  } else {
    return (
    <Link href='/address' className="w-2/10 flex items-center">
    <div className="w-full">
        <p className="overflow-hidden text-nowrap text-ellipsis text-white font-bold hover:text-black">{user?.address?.[0]?.flat+","}{user?.address?.[0]?.street+","}{user?.address?.[0]?.city}</p>
    </div>
    </Link>
  )
  }
}
export default AddressHelper