import { getServerSession } from "next-auth"
import GameCard from "../components/GameCard"
import { GameType } from "../database/game.model"
import Link from "next/link"
import { headers } from "next/headers"

const Games = async () => {
  const res = await fetch('http://localhost:3000/api/Games')
  const {games} = await res.json()
  const head = await headers()
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
      {games.map((game:GameType)=>(
        <div className="w-2/7" key={game.slug}>
        <GameCard  prop={{game,head}}/>
        </div>
      ))}
    </div>
  )
  }
  
}
export default Games