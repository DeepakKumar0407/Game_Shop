import Link from "next/link"
import { getServerSession } from "next-auth"
import { GameType } from "../database/game.model"
import Image from "next/image"
import CheckoutForm from "../components/CheckoutForm"
import { headers } from "next/headers"

const Checkout = async() => {
  const res = await fetch('http://localhost:3000/api/cart')
  const {games} = await res.json()
  const head = await headers()
  const userRes = await fetch('http://localhost:3000/api/user',{
      method:"GET",
      headers:Object.fromEntries(head.entries())
  })
    const {user}= await userRes.json()
  const session = await getServerSession()
  let totalPrice:number = games.reduce((sum:number,game:GameType & {count:number})=>{
    return sum + (Number(game.price)*game.count)
  },0)

  if (!session) {
   return(
    <div>
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
     return (
    <div>
        {games.map((game:GameType & {count:number})=>(
            <div key={game.slug} className="flex justify-between">
            <Image src={game.image!} width={50} height={25} alt='image'/>
            <p>{game.title} x {game.count}</p>
            <p>{game.price}</p>
            </div>
        ))}
        <p>Grand Total: {totalPrice}</p>
        <CheckoutForm prop={{user,games,totalPrice}}/>
    </div>
  )
  }
 
}
export default Checkout