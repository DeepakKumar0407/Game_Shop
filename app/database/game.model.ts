import mongoose, {Schema, Model,models,Document} from 'mongoose'

export interface ReviewType {
    title:string;
    description:string;
    rating:number;
}

export interface GameType extends Document{
    title:string;
    image:string;
    slug:string;
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
    slug:{
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
},{timestamps:true})

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

GameSchema.pre('save', function() {
  const event = this as GameType;


  if (event.isModified('title') || event.isNew) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified('date')) {
    event.releseDate = normalizeDate(event.releseDate);
  }
});

GameSchema.index({ slug: 1 }, { unique: true })

const Game:Model<GameType> = models.Game || mongoose.model<GameType>('Game',GameSchema)

export default Game