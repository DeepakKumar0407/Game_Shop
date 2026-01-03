import { NextRequest,NextResponse } from "next/server";
import ConnectDb from "@/lib/mongodb";
import Game, { GameTypeWithoutDoc } from "@/app/database/game.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/database/user.model";

export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
   try {
     await ConnectDb()
     const {slug} = await params
     const game:GameTypeWithoutDoc|null = await Game.findOne({slug:slug})
     return NextResponse.json({message:"success",game},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:'something went wrong',error},{status:400})
   }

}

export async function PATCH(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
   try {
     await ConnectDb()
     const session = await getServerSession({req,...authOptions})
     const user = await User.findOne({email:session?.user?.email})
     const userId = user?._id
     const reviewData = await req.json()
     const {slug} = await params
     const review = {...reviewData,userId}
     const game = await Game.findOne({slug:slug})
     const reviewExsists = game?.reviews?.some(review=>review.userId===userId?.toString())
    if(reviewExsists){
      throw new Error("Review Alrady Exsists")
    }
     const updatedGame = await Game.updateOne({slug:slug},{$push:{reviews:review}})
     return NextResponse.json({message:"success",updatedGame},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:'something went wrong',error},{status:400})
   }

}
