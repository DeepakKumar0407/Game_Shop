"use client"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <div><button onClick={()=>signOut()} className="bg-orange-500 p-3 rounded-xl w-fit text-center cursor-pointer">Logout</button></div>
  )
}
export default LogoutButton