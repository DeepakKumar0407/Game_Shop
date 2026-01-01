import { NextRequest,NextResponse } from "next/server";
import ConnectDb from "@/lib/mongodb";
import Game, { GameType, GameTypeWithoutDoc } from "@/app/database/game.model";
import { WithUndefined } from "@/lib/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Cart, { CartTypeWithoutDocs } from "@/app/database/cart.model";


export async function POST(req:NextRequest){
   try {
    await ConnectDb()
    const session = await getServerSession({req,...authOptions})
    const slug = await req.text()
    const game = await Game.findOne({slug:slug})
    const newCartObject:WithUndefined<CartTypeWithoutDocs> = {
        userEmail:session?.user?.email,
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
    const cartGame:CartTypeWithoutDocs|null = await Cart.create(newCartObject)
    return NextResponse.json({message:'success'},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:"something went wrong",error},{status:500})
   }
}

export async function GET(req:NextRequest){
  const session = await getServerSession({req,...authOptions})
   try {
     await ConnectDb()
     const games = await Cart.aggregate([
      {
        $match:{
            userEmail:session?.user?.email
        }
      },
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
    const res:CartTypeWithoutDocs|null = await Cart.findOneAndDelete({slug:gameToDelete})
    return NextResponse.json({message:'success'},{status:200})
 } catch (error) {
    console.error(error)
    return NextResponse.json({message:"error",error},{status:400})
 }
}