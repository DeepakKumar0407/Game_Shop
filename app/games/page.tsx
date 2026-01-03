import { getServerSession } from "next-auth"
import GameCard from "../components/GameCard"
import { GameType } from "../database/game.model"
import Link from "next/link"
import { headers } from "next/headers"
import NoLoginPage from "../components/NoLoginPage"

const Games = async () => {
  const res = await fetch('http://localhost:3000/api/Games')
  const {games} = await res.json()
  const head = await headers()
  const session = await getServerSession()
  if (!session) {
   return(
   <NoLoginPage/>
   )
  } else {
    return (
    <div>
    <h1 className="m-10 text-4xl font-bold text-white">All Games</h1>
    <div className="div_main">
      {games.map((game:GameType)=>(
        <div className="min-w-2/7 min-h-full" key={game.slug}>
        <GameCard  prop={{game,head}}/>
        </div>
      ))}
    </div>
    </div>
  )
  }
  
}
export default Games