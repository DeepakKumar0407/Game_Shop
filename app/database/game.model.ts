import mongoose, {Schema, Model,models} from 'mongoose'

export interface ReviewType {
    title:string;
    description:string;
    rating:number;
}

export interface GameType {
    title:string;
    image:string;
    developer:string;
    producer:string;
    description:string;
    reviews:string[];
    releseDate:string;
    tags:string[];
    price:number;
    platform:string[];

}

const GameSchema = new Schema<GameType>({
    title:{
        type:String,
        required:true
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
      reviews:{
        type:[String],
        required:true
    },
      releseDate:{
        type:String,
        required:true
    },
      price:{
        type:Number,
        required:true
    },
      platform:{
        type:[String],
        required:true
    },
})

const Game:Model<GameType> = models.Game || mongoose.model<GameType>('Game',GameSchema)

export default Game