import Link from "next/link"
import { OrderType } from "../database/order.model"

const OrderCard = ({prop}:{prop:any}) => {
    const orders = prop
  return (
    <div>
        <h1>Orders</h1>
        <div className="flex flex-col justify-baseline gap-4">
            {orders.map((order:OrderType & {_id:string})=>(
                <div key={order._id}>
                <Link href={`/profile/orders/${order._id}`}>
                <p>Total Games Orderd: {order.games.length}</p>
                <p>Total Cost: {order.totalPay}</p>
                <p>Ordered On: {order.time}</p>
                </Link>
                </div>
            ))}
        </div>
    </div>
  )
}
export default OrderCard