import LogoutButton from "@/app/components/LogoutButton" 
import { headers } from "next/headers"
import { OrderGameType, OrderType } from "@/app/database/order.model"

const OrderDetails = async ({params}:{params:Promise<{slug:string}>}) => {
const {slug} = await params
const head = await headers()
const res = await fetch("http://localhost:3000/api/user",{
  method:"GET",
  headers:Object.fromEntries(head.entries())
})
const {user} = await res.json()
const orderRes = await fetch(`http://localhost:3000/api/order/${slug}`)
const {order} = await orderRes.json()
const formatDate=(dateString:string)=>{
  let dateDate = new Date(dateString)
  let date = dateDate.toString().split(" ").slice(0,4).join(" ")
  return date
}
    return(
      <div className="div_profile">
        <div className="div_profile_left">
          <p className="orders overflow-auto"><span className="font-bold md:text-base">Name:</span> {user.name}</p>
          <p className="orders overflow-auto"><span className="font-bold md:text-base">Email:</span> {user.email}</p>
          <p className="orders overflow-auto"><span className="font-bold md:text-base">Phone:</span> {user.phone}</p>
          <LogoutButton/>
        </div>
        <div className="w-2/3 flex flex-col justify-baseline gap-2 bg-foreground/50 rounded h-110 overflow-auto orders md:text-xl"> 
          <h1 className="h1_address">Order Details</h1>
          {order.games.map((game:OrderGameType)=>(
            <div className="flex justify-around bg-foreground/80 rounded p-3 ml-3 mr-3" key={game.slug}>
            <p className="max-w-fit min-w-5/10">{game.title}</p>
            <p className="max-w-fit min-w-2/10">Total: {game.count}</p>
            <p className="max-w-fit mix-w-2/10">Price: {game.price}</p>
            </div>
          ))}
          <p className="ml-3 mt-4"><span className="font-bold">Sent to:</span> {Object.values(order.address).join(', ')}</p>
          <p className="ml-3 mt-2"><span className="font-bold">Orderd on:</span> {formatDate(order.createdAt)}</p>
          <p className="ml-3 mt-2"><span className="font-bold">Time slot:</span> {order.time}</p>
          <p className="ml-3 mt-2"><span className="font-bold">Payment Type:</span> {order.payment}</p>
          <p className="ml-3 mt-2 pb-5"><span className="font-bold">Total cost:</span> {order.totalPay}</p>
        </div>
      </div>
    )
  }
export default OrderDetails