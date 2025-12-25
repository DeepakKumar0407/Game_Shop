import { NextRequest,NextResponse } from "next/server";
import ConnectDb from "@/lib/mongodb";
import Cart from "@/app/database/cart.model";
import Game from "@/app/database/game.model";


export async function POST(req:NextRequest){
   try {
    await ConnectDb()
    const slug = await req.text()
    console.log(slug,"here")
    const game = await Game.findOne({slug:slug})
    const newCartObject = {
        title:game?.title,
        image:game?.image,
        slug:game?.slug,
        developer:game?.developer,
        producer:game?.producer,
        description:game?.description,
        releaseDate:game?.releaseDate,
        tags:game?.tags,
        price:game?.price,
        platform:game?.platform,
    }
    const cartGame = Cart.create(newCartObject)
    return NextResponse.json({message:'success'},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:"something went wrong",error},{status:500})
   }
}

export async function GET(req:NextRequest){
   try {
     await ConnectDb()
     const games = await Cart.aggregate([
  {
    $group: {
      _id: "$slug",
      count: { $sum: 1 },
      doc: { $first: "$$ROOT" }
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$doc", { count: "$count" }]
      }
    }
  },
  {
    $sort:{
      slug:1
    }
  }
]);
     return NextResponse.json({message:"success",games},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:'something went wrong',error},{status:400})
   }

}

export async function DELETE(req:NextRequest){
 try {
    await ConnectDb()
    const gameToDelete = await req.text()
    console.log(gameToDelete)
    const res = await Cart.findOneAndDelete({slug:gameToDelete})
    return NextResponse.json({message:'success'},{status:200})
 } catch (error) {
    console.error(error)
    return NextResponse.json({message:"error",error},{status:400})
 }
}