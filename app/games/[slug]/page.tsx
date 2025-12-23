import CartHelper from "@/app/components/CartHelper"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

const GameDetails = async ({params}:{params:Promise<{slug:string}>}) => {
  
  const {slug} = await params
  const res = await fetch(`http://localhost:3000/api/Games/${slug}`)
  const {game} = await res.json()
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
    <div className="flex justify-baseline">
      <div className="w-2/3 bg-blue-700">
      <h1>{game.title}</h1>
      <Image src={game.image} alt="game image" width={1000} height={500}/>
      <p>{game.description}</p>
      <CartHelper prop={game.slug}/>
      <button>Buy Now</button>
      <div>
        <h1>Reviews</h1>
        <p>{game.reviews}</p>
      </div>
      </div>
      <div className="w-1/3 bg-red-600">
        <p>Release Date: {game.releaseDate}</p>
        <br/>
        <p>Developer: {game.developer}</p>
        <p>Producer: {game.producer}</p>
        <div className="flex justify-baseline gap-2">
          {game.tags.map((tag:string)=>(
            <p key={tag}>{tag}</p>
          ))}
        </div>
        <div className="flex justify-baseline gap-2">
          {game.platform.map((plat:string)=>(
            <p key={plat}>{plat}</p>
          ))}
        </div>
        <p>Price ₹{game.price}</p>
      </div>
    </div>
  )
  }
  
}
export default GameDetails