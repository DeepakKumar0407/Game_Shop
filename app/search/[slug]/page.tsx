import GameCard from "@/app/components/GameCard"
import { GameType } from "@/app/database/game.model"
import { getServerSession } from "next-auth"
import Link from "next/link"

const SearchResults = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const res = await fetch(`http://localhost:3000/api/search/${decodeURIComponent(slug)}`)
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
    <div>
      {games.map((game:GameType)=>(
              <div className="w-2/7" key={game.slug}>
              <GameCard  prop={game}/>
              </div>
            ))}
    </div>
  )
}
}
export default SearchResults