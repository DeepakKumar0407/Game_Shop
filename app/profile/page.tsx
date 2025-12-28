import { getServerSession } from "next-auth"
import Link from "next/link"
import LogoutButton from "../components/LogoutButton"
import { headers } from "next/headers"
import OrderCard from "../components/OrderCard"

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
    <div>
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return(
      <div className="flex justify-between">
        <div className="w-1/3">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <LogoutButton/>
        </div>
        <div className="w-2/3"> 
          <OrderCard prop={order}/>
        </div>
      </div>
    )
  }
}
export default UserProfile