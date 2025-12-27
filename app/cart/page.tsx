import Link from "next/link"
import GameCard from "../components/GameCard"
import { GameType, GameTypeWithoutDoc } from "../database/game.model"
import { getServerSession } from "next-auth"
import CartButton from "../components/CartButton"
import { headers } from "next/headers"

const Cart = async() => {
  const head = await headers()
  const res = await fetch('http://localhost:3000/api/cart',{
    method:"GET",
    headers:Object.fromEntries(head.entries()),
  })
  const {games} = await res.json()
  const session = await getServerSession()
  if (!session) {
   return(
    <div>
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
     return (
    <div className="flex justify-around gap-4 mt-5 w-9/10 mx-auto flex-wrap pb-10">
      {games.map((game:GameType & {count:number})=>(
        <div className="w-2/7" key={game.slug} >
        <GameCard prop={game}/>
        <CartButton game={game} head={head}/>
        </div>
      ))}
      <Link href="/checkout">Buy</Link>
    </div>
  )
  }
 
}
export default Cart