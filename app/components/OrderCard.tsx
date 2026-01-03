import Link from "next/link"
import { OrderType } from "../database/order.model"

const OrderCard = ({prop}:{prop:any}) => {
    const orders = prop
  return (
    <div className="w-full">
        <h1 className="h1_address">Orders</h1>
        <div className="flex flex-col justify-baseline gap-4 overflow-auto h-80 w-full md:text-xl mt-5 orders">
            {orders.map((order:OrderType & {_id:string})=>(
                <div key={order._id} className="mr-4">
                <Link href={`/profile/orders/${order._id}`} className="w-full flex justify-between bg-foreground/50 rounded-xl p-5">
                <div className="w-4/10">
                <p><span className="font-bold">Total Games Orderd:</span> {order.games.length}</p>
                <p><span className="font-bold">Total Cost:</span> {order.totalPay}</p>
                </div>
                <div className="w-4/10">               
                <p><span className="font-bold">Ordered On:</span> {Date().split(" ").slice(0,4).join(" ")}</p>
                </div>
                </Link>
                </div>
            ))}
        </div>
    </div>
  )
}
export default OrderCard