import CartHelper from "@/app/components/CartHelper"
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
    <div className="font-robo mt-10 text-white">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return (
    <div className="flex justify-baseline font-robo text-white gap-10 pb-15">
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
      <div className="flex flex-col gap-2 justify-around w-1/3 bg-foreground/30 max-h-fit mt-20 p-3 mr-5">
        <p><span className="font-bold text-xl">Release Date:</span> {game.releaseDate}</p>
        <p><span className="font-bold text-xl">Developer:</span>  {game.developer}</p>
        <p><span className="font-bold text-xl">Producer:</span>  {game.producer}</p>
        <div className="flex justify-baseline gap-2 flex-wrap items-center">
          <p className="font-bold text-xl">Tags:</p>
          {game.tags.map((tag:string)=>(
            <p key={tag} className="bg-background/50 p-2 rounded-xl">{tag}</p>
          ))}
        </div>
        <div className="flex justify-baseline gap-2 flex-wrap items-center">
          <p className="font-bold text-xl">Platforms:</p>
          {game.platform.map((plat:string)=>(
            <p key={plat} className="bg-background/50 p-2 rounded-xl">{plat}</p>
          ))}
        </div>
        <p><span className="font-bold text-xl">Price:</span>  ₹ {game.price}</p>
      </div>
    </div>
  )
  }
  
}
export default GameDetails