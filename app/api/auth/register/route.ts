import User from "@/app/database/user.model";
import ConnectDb from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
   try {
    await ConnectDb()
    const {name,phone,email,password} = await req.json()
    const user = await User.create({name,phone,email,password})
    console.log(user,"backend")
    return NextResponse.json({message:'User Created',user},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({error:"Something went wrong"},{status:400})
   }

}