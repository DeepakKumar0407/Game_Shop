import { getServerSession } from "next-auth";
import GameCard from "./components/GameCard";
import { GameType } from "./database/game.model";
import Link from "next/link";
import { headers } from "next/headers";

export default async function Home() {
  const head = await headers()
  const res = await fetch('http://localhost:3000/api/Games')
  const {games} = await res.json()
  const session = await getServerSession()
  if (!session) {
   return(
    <div className="div">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return (
    <div>
    <h1 className="m-10 text-4xl font-bold text-white ">Featured Games</h1>
    <div className="div_main">
      {games.slice(0,6).map((game:GameType)=>(
        <div className="min-w-2/7 min-h-full" key={game.slug}>
        <GameCard  prop={{game,head}}/>
        </div>
      ))}
    </div>
    </div>
  )
  }
  
}
