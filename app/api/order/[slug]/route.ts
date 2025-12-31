import Order from "@/app/database/order.model";
import ConnectDb from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:{params:Promise<{slug:string}>}){
    try {
        await ConnectDb()
        const {slug} = await params
        const order = await Order.findOne({_id:slug})
        return NextResponse.json({message:"success",order},{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"error",error},{status:400})
    }
}