import { getServerSession } from "next-auth"
import Link from "next/link"
import LogoutButton from "@/app/components/LogoutButton" 
import { headers } from "next/headers"
import OrderCard from "@/app/components/OrderCard" 
import { OrderGameType, OrderType } from "@/app/database/order.model"
import GameCardLong from "@/app/components/GameCardLong"

const OrderDetails = async ({params}:{params:Promise<{slug:string}>}) => {
const {slug} = await params
const head = await headers()
const session = await getServerSession()
const res = await fetch("http://localhost:3000/api/user",{
  method:"GET",
  headers:Object.fromEntries(head.entries())
})
const {user} = await res.json()
const orderRes = await fetch(`http://localhost:3000/api/order/${slug}`)
const {order} = await orderRes.json()
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
        <div className="w-2/3 flex flex-col justify-baseline gap-4"> 
          <h1>Order Details</h1>
          {order.games.map((game:OrderGameType)=>(
            <div className="flex justify-around" key={game.slug}>
            <p className="w-2/3">{game.title}</p>
            <p className="w-1/10">Total: {game.count}</p>
            <p className="w-1/10">Price: {game.price}</p>
            </div>
          ))}
          <p>Sent to: {Object.values(order.address).join(',')}</p>
          <p>Orderd on: {order.createdAt}</p>
          <p>Time slot: {order.time}</p>
          <p>Payment Type: {order.payment}</p>
          <p>Total cost: {order.totalPay}</p>
        </div>
      </div>
    )
  }
}
export default OrderDetails