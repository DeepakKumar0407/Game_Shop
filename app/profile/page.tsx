import { getServerSession } from "next-auth"
import Link from "next/link"
import LogoutButton from "../components/LogoutButton"
import { headers } from "next/headers"
import OrderCard from "../components/OrderCard"
import NoLoginPage from "../components/NoLoginPage"

const UserProfile = async () => {
const head = await headers()
const session = await getServerSession()
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
 if (!session) {
   return(
   <NoLoginPage/>
   )
  } else {
    return(
      <div className="div_profile">
        <div className="div_profile_left">
          <p title={user.name}><span className="font-bold">Name:</span> {user.name}</p>
          <p title={user.email}><span className="font-bold">Email:</span> {user.email}</p>
          <p title={user.phone}><span className="font-bold">Phone:</span> {user.phone}</p>
          <LogoutButton/>
        </div>
        <div className="w-2/3 bg-foreground/50 p-5 rounded"> 
          <OrderCard prop={order}/>
        </div>
      </div>
    )
  }
}
export default UserProfile