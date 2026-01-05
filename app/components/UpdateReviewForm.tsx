"use client"
import { StarIcon  as StarIconSolid} from "@heroicons/react/24/solid"
import { StarIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { GameTypeWithoutDoc, ReviewType } from "../database/game.model"
import { UserType } from "../database/user.model"

const UpdateReviewForm = ({game,user,head,setUpdated,updated,deleted,setDeleted}:{game:GameTypeWithoutDoc|undefined,user:UserType & {_id:string}|undefined,head:any,setUpdated:Function,updated:Boolean,setDeleted:Function,deleted:string}) => {
    type WithUndefined<T> = {
        [K in keyof T]:T[K]|undefined
    }
    const initialData:WithUndefined<ReviewType>={
        userId:"",
        userName:"",
        title:"",
        description:"",
        rating:1
    }
    const [isSelected,setIsSelected] = useState(false)
    const [reviewData, setReviewData] = useState<WithUndefined<Partial<ReviewType>>|undefined>(initialData)
    const ratingArray = [1,2,3,4,5]

    
    useEffect(()=>{
        const userReview = game?.reviews?.filter(review=>review.userId===user?._id)[0]
        setReviewData(userReview)
    },[game,user])
    const handleChange =(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
         const {name,value} = e.target
        setReviewData((state)=>({
            ...state,
            [name]:name==="rating"?Number(value):value,
        }))
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(reviewData)
        const res = await fetch(`http://localhost:3000/api/reviews/${game?.slug}`,{
            method:"PATCH",
            headers:head,
            body:JSON.stringify(reviewData)
        })
        setUpdated(!updated)
    }
     const handleOver = (index:number)=>{
        setReviewData((state)=>({
            ...state,
            rating:index
        }))
    }
    const handleDelete =async ()=>{
        const res = await fetch(`http://localhost:3000/api/reviews/${game?.slug}`,{
            method:"DELETE",
            headers:head,
            body:reviewData?.userId
        })
        setIsSelected(false)
        setDeleted('owned')
    }
     console.log(updated)
  return (
     <div>
        {isSelected?
        (
        <div className="w-full mt-5 text-black rounded-xl">
        <h1 className="md:text-xl lg:text-2xl pt-5 pl-5 pb-5 mb-5 font-bold bg-yellow-400 rounded-xl">Update Your Review</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-baseline gap-3 rounded p-5 md:text-xl bg-yellow-400">
            <label className=""><span className="font-bold">Title: </span></label> <input type="text" name="title" value={reviewData?.title} className="p-3 w-1/2 border-2 border-amber-600 rounded-xl " placeholder="Type title" onChange={handleChange} required maxLength={70}></input>
            <label className=""><span className="font-bold">Description: </span></label> <textarea name="description" value={reviewData?.description} className="p-3 w-1/2 border-2 border-amber-600 rounded-xl font-normal whitespace-pre-wrap break-words" placeholder="Type description" onChange={handleChange} required maxLength={3000} rows={5}></textarea>
            <label className=""><span className="font-bold">Rating</span></label>
            <div className="flex justify-baseline gap-2">
            {ratingArray.map((r:number,index:number)=>(
                <button className="cursor-pointer" type="button" onClick={()=>handleOver(r)} key={index}>
                {reviewData?.rating!<index+1?<StarIcon className="w-4 h-4 md:w-7 md:h-7 text-black"/>:<StarIconSolid className="w-4 h-4 md:w-7 md:h-7 text-black"/>}
                </button>
            ))}
            </div>
            <div className="w-full flex justify-center md:gap-10 mt-5">
            <button type="submit" className="bg-green-800 hover:bg-green-700 p-3 w-2/10 text-center rounded-2xl cursor-pointer font-bold">Update</button>
            <button type="button" className="bg-red-700 p-3 w-2/10 text-center rounded-2xl cursor-pointer hover:bg-red-600 font-bold" onClick={handleDelete}>Delete</button>
            <button onClick={()=>setIsSelected(!isSelected)}  className="bg-amber-500 p-3 w-2/10 text-center rounded-2xl cursor-pointer hover:bg-amber-600 font-bold">Close</button>
            </div>
        </form>
        </div>
        )
        :(<button onClick={()=>setIsSelected(!isSelected)} className="bg-amber-500 p-3 w-2/10 text-center rounded-2xl cursor-pointer hover:bg-amber-600 font-bold ml-10 mt-5 text-black">Update Your Review</button>)}
    </div>
  )
}
export default UpdateReviewForm