"use client"
import { useEffect, useState } from "react"
import { GameTypeWithoutDoc, ReviewType } from "../database/game.model"
import { OrderType } from "../database/order.model"
import { StarIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"
import { UserType } from "../database/user.model"

const ReviewForm = ({slug,orders,head}:{orders:OrderType[],head:any,slug:string}) => {
    const initialData:Omit<ReviewType,"userId">={
        userName:"",
        title:"",
        description:"",
        rating:1
    }
    const [reviewData, setReviewData] = useState(initialData)
    const [flag,setFlag] = useState("none")
    const [game,setGame] = useState<GameTypeWithoutDoc>()
    const [user,setUser] = useState<UserType>()
    const [rating,setRating] = useState(1)
    const ratingArray = [1,2,3,4,5]
     useEffect(()=>{
        const fetchGame = async ()=>{
            const res = await fetch(`http://localhost:3000/api/Games/${slug}`)
            const {game} = await res.json()
            setGame(game) 
        }
         const fetchUser = async ()=>{
            const res = await fetch(`http://localhost:3000/api/user`,{
                method:"GET",
                headers:head
            })
            const {user} = await res.json()
            setUser(user)
            setReviewData((state)=>({
                ...state,
                userName:user.name
            })) 
        }
        fetchGame()
        fetchUser()
    },[flag])
    useEffect(()=>{
        const compareGame = ()=>{
            orders.map((order:OrderType)=>{
                for(let i=0;i<order.games.length;i++){
                    if(game?.slug===order.games[i].slug&&flag!=="posted"){
                    setFlag("owned")
                    }
                }
            })
            }
        const compareReview =()=>{
            game?.reviews?.map((review:ReviewType)=>{
                if(review?.userId===orders[0]?.userId){
                setFlag("posted")
                }
            })
        }
        compareGame()
        compareReview()
    },[game])
   
    const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value} = e.target
        setReviewData((state)=>({
            ...state,
            [name]:name==="rating"?Number(value):value,
        }))
    }
    const handleOver = (index:number)=>{
        setRating(index+1)
        setReviewData((state)=>({
            ...state,
            rating:rating
        }))
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/Games/${game?.slug}`,{
            method:"PATCH",
            headers:head,
            body:JSON.stringify(reviewData)
        })
        if(res.ok){
            setFlag("posted")
            console.log("changed",flag)
        }
    }
  
    if(flag==="owned"){
  return (
    <div className="w-full mt-5 text-black rounded-xl">
        <h1 className="md:text-xl lg:text-2xl pt-5 pl-5 pb-5 mb-5 font-bold bg-yellow-400 rounded-xl">Post your review</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-baseline gap-3 rounded p-5 md:text-xl bg-yellow-400">
            <label className=""><span className="font-bold">Title: </span></label> <input type="text" name="title" value={reviewData.title} className="p-3 w-1/2 border-2 border-amber-600 rounded-xl " placeholder="Type title" onChange={handleChange} required maxLength={70}></input>
            <label className=""><span className="font-bold">Description: </span></label> <textarea name="description" value={reviewData.description} className="p-3 w-1/2 border-2 border-amber-600 rounded-xl font-normal whitespace-pre-wrap break-words" placeholder="Type description" onChange={handleChange} required maxLength={3000} rows={5}></textarea>
            <label className=""><span className="font-bold">Rating</span></label>
            <div className="flex justify-baseline gap-2">
            {ratingArray.map((r:number,index:number)=>(
                <button className="cursor-pointer" type="button"onMouseOver={()=>handleOver(index)} key={index}>
                {rating<index+1?<StarIcon className="w-7 h-7 text-black"/>:<StarIconSolid className="w-7 h-7 text-black"/>}
                </button>
            ))}
            </div>
            <div className="w-full flex justify-center">
            <button type="submit" className="bg-amber-500 p-3 w-2/10 text-center rounded-2xl cursor-pointer hover:bg-yellow-700 font-bold">Post</button>
            </div>
        </form>
        <h1 className="md:text-xl lg:text-2xl pt-5 pl-5 pb-5 mb-5 mt-5 font-bold bg-yellow-400 rounded-xl">Reviews by others</h1>
         <div className="flex flex-col justify-baseline gap-4 w-full p-5 ml-5 text-black">
          {game?.reviews?.map((review:ReviewType,index:number)=>(
            <div key={index} className="flex justify-baseline gap-2 bg-yellow-400 p-5 rounded-xl">
               <div className="w-1/3">
               <p className="bg-amber-500 w-fit p-5 rounded-xl">Posted by: {review.userName}</p>
               </div>
               <div className="flex justify-baseline gap-2 flex-col w-2/3">
               <p className="bg-amber-500 w-full p-3 pl-5 rounded-xl">{review.title}</p>
               <p className="bg-amber-500 w-full p-5 rounded-xl max-h-50 overflow-auto review"> {review.description}</p>
               <div className="bg-amber-500 w-fit p-5 rounded-xl flex justify-baseline gap-2">{Array.from({length:review.rating}).map((r:any,index:number)=>(
                <div key={index} className="">
                <StarIconSolid className="w-7 h-7"/>
                </div>
               ))}</div>
               </div>
            </div>
          ))}
        </div>
    </div>
  )
}else if(flag==="posted"){
    return(
        <div>Update
        <div className="flex flex-col justify-baseline gap-4 w-full p-5 ml-5 text-black">
          {game?.reviews?.map((review:ReviewType,index:number)=>(
            <div key={index} className="flex justify-baseline gap-2 bg-yellow-400 p-5 rounded-xl">
               <div className="w-1/3">
               <p className="bg-amber-500 w-fit p-5 rounded-xl">Posted by: {review.userName}</p>
               </div>
               <div className="flex justify-baseline gap-2 flex-col w-2/3">
               <p className="bg-amber-500 w-full p-3 pl-5 rounded-xl">{review.title}</p>
               <p className="bg-amber-500 w-full p-5 rounded-xl max-h-50 overflow-auto review"> {review.description}</p>
               <div className="bg-amber-500 w-fit p-5 rounded-xl flex justify-baseline gap-2">{Array.from({length:review.rating}).map((r:any,index:number)=>(
                <div key={index} className="">
                <StarIconSolid className="w-7 h-7"/>
                </div>
               ))}</div>
               </div>
            </div>
          ))}
        </div>
        </div>
        
    )
}
else{
    return(
        <div className="flex flex-col justify-baseline gap-4 w-full p-5 ml-5 text-black">
          {game?.reviews?.map((review:ReviewType,index:number)=>(
            <div key={index} className="flex justify-baseline gap-2 bg-yellow-400 p-5 rounded-xl">
               <div className="w-1/3">
               <p className="bg-amber-500 w-fit p-5 rounded-xl">Posted by: {review.userName}</p>
               </div>
               <div className="flex justify-baseline gap-2 flex-col w-2/3">
               <p className="bg-amber-500 w-full p-3 pl-5 rounded-xl">{review.title}</p>
               <p className="bg-amber-500 w-full p-5 rounded-xl overflow-auto review max-h-50"> {review.description}</p>
               <div className="bg-amber-500 w-fit p-5 rounded-xl flex justify-baseline gap-2">{Array.from({length:review.rating}).map((r:any,index:number)=>(
                <div key={index} className="">
                <StarIconSolid className="w-7 h-7"/>
                </div>
               ))}</div>
               </div>
            </div>
          ))}
        </div>
    )
}
}

export default ReviewForm