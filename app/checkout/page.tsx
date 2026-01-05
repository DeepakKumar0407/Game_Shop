import { GameType } from "../database/game.model"
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
  let totalPrice:number = games.reduce((sum:number,game:GameType & {count:number})=>{
    return sum + (Number(game.price)*game.count)
  },0)
     return (
    <div className="font-robo text-white flex justify-baseline w-9/10 mx-auto mb-15 gap-2">
      <div className="flex justify-baseline flex-col gap-4 mt-5 w-2/3">
      {games.map((game:CartType & {count:number})=>(
        <div key={game.slug} className="w-full flex justify-baseline bg-foreground/40 hover:bg-foreground">        
        <GameCardLong game={game} flag={flag}/>
        </div>
      ))}
      </div>
      <div className="w-1/3 mt-5 p-3 bg-foreground/40 h-fit">
      <CheckoutForm prop={{user,games,totalPrice}}/>
      </div>
    </div>
  )
  }
export default Checkout