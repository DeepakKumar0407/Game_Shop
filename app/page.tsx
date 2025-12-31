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
    <div className="bg-background">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return (
    <div className="flex justify-around gap-4 mt-5 w-9/10 mx-auto flex-wrap pb-10">
      {games.slice(0,6).map((game:GameType)=>(
        <div className="min-w-2/7 min-h-full" key={game.slug}>
        <GameCard  prop={{game,head}}/>
        </div>
      ))}
    </div>
  )
  }
  
}
