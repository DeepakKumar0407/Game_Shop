import mongoose, {Schema, Model,models,Document} from 'mongoose'
import { UserAddress } from './user.model';


export interface OrderGameType{
    title:string;
    slug:string;
    count:number;
    price:string;
}

export interface OrderType{
    userId:string;
    games:OrderGameType[];
    address:UserAddress;
    time:string;
    payment:string;
    totalPay:string;
}

const OrderSchema = new Schema<OrderType>({
    userId:{
        type:String,
        required:true
    },
    games:[{
            title:{
                type:String,
                required:true
            },
            slug:{
                type:String,
                required:true
            },
            count:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            }
        }],
    address:{
        flat:{
            type:String,
            required:true
        },
            street:{
            type:String,
            required:true
        },
            area:{
            type:String,
            required:true
        },
            city:{
            type:String,
            required:true
        },
            state:{
            type:String,
            required:true
        },
            country:{
            type:String,
            required:true
        },
            pincode:{
            type:String,
            required:true
        },

    },
    time:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    totalPay:{
        type:String,
        required:true
    },

},{timestamps:true})

const Order:Model<OrderType> = models.Order || mongoose.model<OrderType>("Order",OrderSchema)

export default Order