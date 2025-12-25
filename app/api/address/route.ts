import User from "@/app/database/user.model";
import ConnectDb from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    await ConnectDb()
    const session = await getServerSession()
    const address = await req.json()
    const res = await User.findOneAndUpdate({email:session?.user?.email},{$push:{address:address}})
    return NextResponse.json({message:"success"})
}
export async function GET(req:NextRequest){
    await ConnectDb()
    const session = await getServerSession()
    const user= await User.findOne({email:session?.user?.email})
    const address = user?.address
    return NextResponse.json({message:"success",address})
}