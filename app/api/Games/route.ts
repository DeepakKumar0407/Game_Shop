import { NextRequest,NextResponse } from "next/server";
import ConnectDb from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Game from "@/app/database/game.model";


export async function POST(req:NextRequest){
   try {
    await ConnectDb()
    const data = await req.formData()
    const image = data.get('image') as File
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadStream = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({resource_type:"image",folder:"game"},(error,result)=>{
             if(error){
                    return reject(error)
                }
                return resolve(result)
        }).end(buffer)
    })
    const game = {
        title:data.get('title')?.toString(),
        description:data.get('description')?.toString(),
        developer:data.get("developer")?.toString(),
        producer:data.get("producer")?.toString(),
        price:data.get('price')?.toString(),
        tags:data.get('tags')?.toString().split(','),
        platform:data.get('platform')?.toString().split(','),
        releaseDate:data.get('releaseDate')?.toString(),
        image:(uploadStream as {secure_url:string}).secure_url,
    }
    const submittedGame = await Game.create(game)
    return NextResponse.json({message:'success',submittedGame},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:"something went wrong",error},{status:500})
   }
}

export async function GET(req:NextRequest){
   try {
     await ConnectDb()
     const games = await Game.find().sort({createdAt:-1})
     return NextResponse.json({message:"success",games},{status:200})
   } catch (error) {
    console.error(error)
    return NextResponse.json({message:'something went wrong',error},{status:400})
   }

}