import mongoose, { Schema,Model,models } from "mongoose";
import bcrypt from 'bcrypt'

export interface UserAddress{
    flat:string;
    street:string;
    area:string;
    city:string,
    state:string,
    country:string,
    pincode:string,
}
export interface UserType{
    name:string;
    phone:string;
    email:string;
    password:string;
    address?:UserAddress[];
}
export const isValidPassword = ()=>{
    console.log(true)
}
const UserSchema = new Schema<UserType>({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
        validate:{
            validator:(v:string)=>v.length ===10,
            message:"Number munst be 10 digits"
        }
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate:{
            validator:(e)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
            },
            message:'Not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(p)=>{
                return /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(p)
            },
            message:"Invalid Password"
        }
    },
    address:[{
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

        }]
},{timestamps:true})

UserSchema.pre('save',async function(){
    try {
        if(!this.isModified('password')) return
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    } catch (error) {
        console.log(error)
    }
})

UserSchema.methods.isValidPassword = async function (password:string){
    try {
       return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error)
        throw new Error('Password comparison failed');
    }
}
UserSchema.methods.isValidEmail = function(email:string){
    try {
        if(email.toLocaleLowerCase() === this.email){
            return true
        }
        else{
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ phone: 1 }, { unique: true })
const User:Model<UserType> = models.User || mongoose.model<UserType>('User',UserSchema)

export default User