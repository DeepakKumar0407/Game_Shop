import LogoutButton from "../components/LogoutButton"
import { headers } from "next/headers"
import OrderCard from "../components/OrderCard"

const UserProfile = async () => {
const head = await headers()
const res = await fetch("http://localhost:3000/api/user",{
  method:"GET",
  headers:Object.fromEntries(head.entries())
})
const {user} = await res.json()
const userRes = await fetch("http://localhost:3000/api/order",{
  method:"GET",
  headers:Object.fromEntries(head.entries())
})
const {order} = await userRes.json()

    return(
      <div className="div_profile">
        <div className="div_profile_left">
          <p title={user.name} className="orders overflow-auto"><span className="font-bold md:text-base">Name:</span> {user.name}</p>
          <p title={user.email} className="orders overflow-auto"><span className="font-bold md:text-base">Email:</span> {user.email}</p>
          <p title={user.phone} className="orders overflow-auto"><span className="font-bold md:text-base">Phone:</span> {user.phone}</p>
          <LogoutButton/>
        </div>
        <div className="w-2/3 bg-foreground/50 p-5 rounded"> 
          <OrderCard prop={order}/>
        </div>
      </div>
    )
  }
export default UserProfile