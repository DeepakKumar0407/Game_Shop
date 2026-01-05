import GameCard from "@/app/components/GameCard"
import { GameType } from "@/app/database/game.model"
import { headers } from "next/headers"

const SearchResults = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const head = await headers()
  const res = await fetch(`http://localhost:3000/api/search/${decodeURIComponent(slug)}`)
  const {games} = await res.json()
  return (
    <div>
    <h1 className="m-10 text-4xl font-bold text-white ">Results for {decodeURIComponent(slug)}</h1>
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
export default SearchResults