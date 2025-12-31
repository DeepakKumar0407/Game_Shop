import Link from "next/link"
import { getServerSession } from "next-auth"
import { GameType } from "../database/game.model"
import Image from "next/image"
import CheckoutForm from "../components/CheckoutForm"
import { headers } from "next/headers"
import GameCardLong from "../components/GameCardLong"
import { CartType } from "../database/cart.model"

const Checkout = async() => {
  const flag = true
  const head = await headers()
  const res = await fetch('http://localhost:3000/api/cart',{
    method:"GET",
    headers:Object.fromEntries(head.entries()),
  })
  const {games} = await res.json()
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
    <div className="font-robo mt-10 text-white">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
     return (
    <div>
      <div className="flex justify-baseline flex-col gap-4 mt-5 w-9/10 mx-auto">
      {games.map((game:CartType & {count:number})=>(
        <div key={game.slug}>        
        <GameCardLong game={game} flag={flag}/>
        </div>
      ))}
      </div>
      <p>Grand Total: {totalPrice}</p>
      <CheckoutForm prop={{user,games,totalPrice}}/>
    </div>
  )
  }
 
}
export default Checkout