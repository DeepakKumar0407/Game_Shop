import mongoose, {Schema, Model,models,Document} from 'mongoose'


export interface GameType extends Document{
    title:string;
    image:string|null;
    slug?:string;
    developer:string;
    producer:string;
    description:string;
    releaseDate:string;
    tags:string[];
    price:string;
    platform:string[];

}

const CartSchema = new Schema<GameType>({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
    },
      image:{
        type:String,
        required:true
    },
      developer:{
        type:String,
        required:true
    },
      producer:{
        type:String,
        required:true
    },
      description:{
        type:String,
        required:true
    },
      tags:{
        type:[String],
        required:true
    },
      releaseDate:{
        type:String,
        required:true
    },
      price:{
        type:String,
        required:true
    },
      platform:{
        type:[String],
        required:true
    },
},{timestamps:true})

const Cart:Model<GameType> = models.Cart || mongoose.model<GameType>('Cart',CartSchema)

export default Cart