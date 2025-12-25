import Game from "@/app/database/game.model";
import ConnectDb from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
 try {
       await ConnectDb()
    const tags = await Game.aggregate([
        {
            $unwind:"$tags"
        },
        {
            $group:{
                _id:null,
                allTags:{$addToSet:"$tags"}
            }
        },
        {
        $project: {
            _id: 0,
            allTags: 1
        }
    }
    ])
    return NextResponse.json({message:"success",tags},{status:200})
 } catch (error) {
    console.error(error)
    return NextResponse.json({message:"error"},{status:400})
 }
}