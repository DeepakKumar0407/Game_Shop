import GameCard from "@/app/components/GameCard"
import { GameType } from "@/app/database/game.model"

const SearchResults = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const res = await fetch(`http://localhost:3000/api/search/${decodeURIComponent(slug)}`)
  const {games} = await res.json()
  console.log(games)
  return (
    <div>
      {games.map((game:GameType)=>(
              <div className="w-2/7" key={game.slug}>
              <GameCard  prop={game}/>
              </div>
            ))}
    </div>
  )
}
export default SearchResults