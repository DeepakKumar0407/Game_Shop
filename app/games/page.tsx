import GameCard from "../components/GameCard"
import { GameType } from "../database/game.model"

const Games = async () => {
  const res = await fetch('http://localhost:3000/api/Games')
  const {games} = await res.json()
  return (
    <div>
      {games.map((game:GameType)=>(
        <GameCard key={game.slug} prop={game}/>
      ))}
    </div>
  )
}
export default Games