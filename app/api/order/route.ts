import Order from "@/app/database/order.model";
import ConnectDb from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await ConnectDb()
    const order = await req.json()
    const placeOrder = await Order.create(order)
    console.log(placeOrder)
    return NextResponse.json({message:'success',placeOrder},{status:200})
}