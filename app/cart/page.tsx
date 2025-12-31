import Link from "next/link"
import GameCard from "../components/GameCard"
import { GameType, GameTypeWithoutDoc } from "../database/game.model"
import { getServerSession } from "next-auth"
import CartButton from "../components/CartButton"
import { headers } from "next/headers"
import GameCardLong from "../components/GameCardLong"
import { CartType } from "../database/cart.model"

const Cart = async() => {
  const head = await headers()
  const res = await fetch('http://localhost:3000/api/cart',{
    method:"GET",
    headers:Object.fromEntries(head.entries()),
  })
  const {games} = await res.json()
  const flag = false
  const session = await getServerSession()
  if (!session) {
   return(
    <div className="font-robo mt-10 text-white">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
     return (
    <div className="flex justify-baseline flex-col gap-4 mt-5 w-9/10 mx-auto pb-10">
      {games.map((game:CartType & {count:number})=>(
        <div className="w-full flex justify-between" key={game.slug} >
        <GameCardLong game={game} flag={flag}/>
        <CartButton game={game} head={head}/>
        </div>
      ))}
      <Link href="/checkout">Buy</Link>
    </div>
  )
  }
 
}
export default Cart