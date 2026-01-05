import Link from "next/link"
import GameCard from "../components/GameCard"
import { GameType, GameTypeWithoutDoc } from "../database/game.model"
import { getServerSession } from "next-auth"
import CartButton from "../components/CartButton"
import { headers } from "next/headers"
import GameCardLong from "../components/GameCardLong"
import { CartType } from "../database/cart.model"
import NoLoginPage from "../components/NoLoginPage"

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
   <NoLoginPage/>
   )
  } else {
     return (
    <div className="flex justify-baseline flex-col gap-4 mt-5 w-7/10  mx-auto mb-15 font-robo text-white">
      {games.map((game:CartType & {count:number})=>(
        <div key={game.slug} className="flex justify-baseline gap-3">
        <div className="w-3/4 flex justify-baseline bg-foreground/40 hover:bg-foreground" >
        <GameCardLong game={game} flag={flag}/>
        </div>
        <CartButton game={game} head={head}/>
        </div>
      ))}
      <div className="w-3/4 flex justify-end">
      {games.length>0?<Link href="/checkout" className="bg-green-800 hover:bg-green-500 p-3 pl-5 pr-5 mt-3 rounded-xl text-center">Buy</Link>:<h1 className="text-2xl">No Games Found</h1>}
      </div>
    </div>
  )
  }
 
}
export default Cart