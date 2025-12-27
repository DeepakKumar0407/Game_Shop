import User, { UserAddress, UserType } from "@/app/database/user.model";
import ConnectDb from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import {ObjectId} from "mongodb"
import { Types } from "mongoose";

export async function PUT(req:NextRequest){
    try {
        await ConnectDb()
        const session = await getServerSession()
        const address:UserAddress = await req.json()
        const res:UserType|null = await User.findOneAndUpdate({email:session?.user?.email},{$push:{address:address}})
        return NextResponse.json({message:"success"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:400})
    }
}
export async function GET(req:NextRequest){
      try {
        await ConnectDb()
        const session = await getServerSession({req,...authOptions})
        const user:UserType|null= await User.findOne({email:session?.user?.email}).lean()
        return NextResponse.json({message:"success",user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:400})
    }
}
export async function DELETE(req:NextRequest){
    try {
        await ConnectDb()
        const {userId,addressId} = await req.json()
        const res = await User.updateOne({ _id:userId},{ $pull: { address: { _id:addressId}}})
        return NextResponse.json({message:"success"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error",error},{status:400})
    }
}