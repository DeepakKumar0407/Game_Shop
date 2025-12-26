import { NextRequest,NextResponse } from "next/server";
import ConnectDb from "@/lib/mongodb";
import Game, { GameTypeWithoutDoc } from "@/app/database/game.model";

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