import { NextRequest,NextResponse } from "next/server";
import ConnectDb from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Game, { GameTypeWithoutDoc } from "@/app/database/game.model";
import { WithUndefined } from "@/lib/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/app/database/user.model";

export async function PATCH(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try {
        await ConnectDb()
        const session = await getServerSession({req,...authOptions})
        const user = await User.findOne({email:session?.user?.email})
        const userId = user?._id.toString()
        const review = await req.json()
        const {slug} = await params
        const updatedReview = await Game.findOne({slug:slug}).updateOne({"reviews.userId":userId},{$set:{"reviews.$":review}})
        return NextResponse.json({message:"success",updatedReview},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:'something went wrong',error},{status:400})
    }
}

export async function DELETE(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try {
        await ConnectDb()
        const userId = await req.text()
        const {slug} = await params
        const deleteReview = await Game.updateOne({slug:slug,"reviews.userId":userId},{$pull:{reviews:{userId:userId}}})
        console.log(deleteReview,userId)
        return NextResponse.json({message:"success",deleteReview},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:'something went wrong',error},{status:400})
    }
}