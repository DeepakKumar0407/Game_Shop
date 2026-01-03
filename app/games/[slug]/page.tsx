import CartHelper from "@/app/components/CartHelper"
import NoLoginPage from "@/app/components/NoLoginPage"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

const GameDetails = async ({params}:{params:Promise<{slug:string}>}) => {
  
  const {slug} = await params
  const head = await headers()
  const res = await fetch(`http://localhost:3000/api/Games/${slug}`)
  const {game} = await res.json()
  const session = await getServerSession()
  if (!session) {
   return(
    <NoLoginPage/>
   )
  } else {
    return (
    <div className="div_game_detail">
      <div className="w-2/3">
      <h1 className="font-bold m-5 text-4xl">{game.title}</h1>
      <Image src={game.image} alt="game image" width={1000} height={500} className="ml-5 w-full"/>
      <p className="m-5 text-justify">{game.description}</p>
      <div className="ml-5">
      <CartHelper prop={{slug:game.slug,head}}/>
      </div>
      <div>
        <h1>Reviews</h1>
        <p>{game.reviews}</p>
      </div>
      </div>
      <div className="div_game_detail_right">
        <p><span className="font-bold text-xl">Release Date:</span> {game.releaseDate}</p>
        <p><span className="font-bold text-xl">Developer:</span>  {game.developer}</p>
        <p><span className="font-bold text-xl">Producer:</span>  {game.producer}</p>
        <div className="flex justify-baseline gap-2 flex-wrap items-center">
          <p className="font-bold text-xl">Tags:</p>
          {game.tags.map((tag:string,index:number)=>(
            <p key={index} className="bg-background/50 p-2 rounded-xl">{tag}</p>
          ))}
        </div>
        <div className="flex justify-baseline gap-2 flex-wrap items-center">
          <p className="font-bold text-xl">Platforms:</p>
          {game.platform.map((plat:string,index:number)=>(
            <p key={index} className="bg-background/50 p-2 rounded-xl">{plat}</p>
          ))}
        </div>
        <p><span className="font-bold text-xl">Price:</span>  ₹ {game.price}</p>
      </div>
    </div>
  )
  }
  
}
export default GameDetails