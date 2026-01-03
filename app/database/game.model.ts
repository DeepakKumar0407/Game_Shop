import mongoose, {Schema, Model,models,Document} from 'mongoose'
import { unique } from 'next/dist/build/utils';

export interface ReviewType {
    userId:string;
    title:string;
    description:string;
    rating:number;
}

export interface GameTypeWithoutDoc{
    title:string;
    image:string|null;
    slug?:string;
    developer:string;
    producer:string;
    description:string;
    reviews?:ReviewType[];
    releaseDate:string;
    tags:string[];
    price:string;
    platform:string[];

}

export interface GameType extends Document{
    title:string;
    image:string|null;
    slug?:string;
    developer:string;
    producer:string;
    description:string;
    reviews?:ReviewType[];
    releaseDate:string;
    tags:string[];
    price:string;
    platform:string[];

}

const GameSchema = new Schema<GameType>({
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
      reviews:[
        {
          userId:{
            type:String,
            required:true,
          },
          title:{
            type:String,
            required:true
          },
           description:{
            type:String,
            required:true
          },
           rating:{
            type:Number,
            required:true
          }
        }
      ],
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

GameSchema.pre('save', function() {
  const game = this as GameType;


  if (game.isModified('title') || game.isNew) {
    game.slug = generateSlug(game.title);
  }

  if (game.isModified('date')) {
    game.releaseDate = normalizeDate(game.releaseDate);
  }
});
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, ''); 
}


function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date.toISOString().split('T')[0]; 
}
GameSchema.index({ slug: 1 }, { unique: true })

const Game:Model<GameType> = models.Game || mongoose.model<GameType>('Game',GameSchema)

export default Game