import CalculateRating from "@/app/components/CalculateRating"
import CartHelper from "@/app/components/CartHelper"
import ReviewForm from "@/app/components/ReviewForm"
import { headers } from "next/headers"
import Image from "next/image"


const GameDetails = async ({params}:{params:Promise<{slug:string}>}) => {
  
  const {slug} = await params
  const head = await headers()
  const res = await fetch(`http://localhost:3000/api/Games/${slug}`)
  const {game} = await res.json()
  const orderRes = await fetch(`http://localhost:3000/api/order`,{
    method:"GET",
    headers:Object.fromEntries(head.entries())
  })
  const {order} = await orderRes.json()
    return (
    <div className="div_game_detail">
      <div className="w-2/3">
      <h1 className="font-bold m-5 text-4xl">{game.title}</h1>
      <Image src={game.image} alt="game image" width={1000} height={500} className="ml-5 w-full"/>
      <p className="m-5 text-justify overflow-auto orders">{game.description}</p>
      <div className="ml-5">
      <CartHelper prop={{slug:game.slug,head}}/>
      </div>
      <div className="mt-5 w-full rounded-xl ml-5">
        <h1 className="bg-yellow-600 text-black md:text-2xl lg:text-4xl p-5 font-bold">Reviews</h1>
        <ReviewForm slug={slug} orders={order} head={head}/>
      </div>
      </div>
      <div className="div_game_detail_right">
        <p><span className="font-bold md:text-xl">Release Date:</span> {game.releaseDate}</p>
        <p><span className="font-bold md:text-xl">Developer:</span>  {game.developer}</p>
        <p><span className="font-bold md:text-xl">Producer:</span>  {game.producer}</p>
        <div className="flex justify-baseline gap-2 items-center">
          <p><span className="font-bold md:text-xl">Rating:</span></p>
          <CalculateRating game={game}/>
          </div>
        <div className="flex justify-baseline gap-2 flex-wrap items-center">
          <p className="font-bold md:text-xl">Tags:</p>
          {game.tags.map((tag:string,index:number)=>(
            <p key={index} className="bg-background/50 p-2 rounded-xl">{tag}</p>
          ))}
        </div>
        <div className="flex justify-baseline gap-2 flex-wrap items-center">
          <p className="font-bold md:text-xl">Platforms:</p>
          {game.platform.map((plat:string,index:number)=>(
            <p key={index} className="bg-background/50 p-2 rounded-xl">{plat}</p>
          ))}
        </div>
        <p><span className="font-bold md:text-xl">Price:</span>  ₹ {game.price}</p>
      </div>
    </div>
  )
  }
export default GameDetails