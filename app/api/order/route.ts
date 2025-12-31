import Order from "@/app/database/order.model";
import ConnectDb from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/database/user.model";

export async function POST(req:NextRequest){
   try {
     await ConnectDb()
    const order = await req.json()
    const placeOrder = await Order.create(order)
    return NextResponse.json({message:'success',placeOrder},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:"error",error},{status:400})
   }
}

export async function GET(req:NextRequest){
    try {
        await ConnectDb()
        const session = await getServerSession({req,...authOptions})
        const user = await User.findOne({email:session?.user?.email})
        const userId = (user?._id)?.toString()
        const order = await Order.find({userId:userId}).sort({createdAt:-1})
        return NextResponse.json({message:"success",order},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"error",error},{status:400})
    }
}