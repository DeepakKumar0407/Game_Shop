import GameCard from "./components/GameCard";
import { GameType } from "./database/game.model";

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/Games')
  const {games} = await res.json()
  return (
    <div>
      {games.slice(0,6).map((game:GameType)=>(
        <GameCard key={game.slug} prop={game}/>
      ))}
    </div>
  )
}
