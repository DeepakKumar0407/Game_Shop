import mongoose from 'mongoose'

export default async function ConnectDb(){
 try {
       const MONGO_URI = process.env.MONGO_URI
    if(!MONGO_URI){
    throw new Error("No mongo db connection string present")
    }
    const conn = mongoose.connect(MONGO_URI,{
        dbName:"shop"
    })
    return conn
 } catch (error) {
    console.error(error)
 }
}