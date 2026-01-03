"use client"
import { useEffect, useState } from "react"
import { GameTypeWithoutDoc, ReviewType } from "../database/game.model"
import { OrderType } from "../database/order.model"

const ReviewForm = ({slug,orders,head}:{orders:OrderType[],head:any,slug:string}) => {
    const initialData:Omit<ReviewType,"userId">={
        title:"",
        description:"",
        rating:1
    }
    const [reviewData, setReviewData] = useState(initialData)
    const [flag,setFlag] = useState("none")
    const [game,setGame] = useState<GameTypeWithoutDoc>()
     useEffect(()=>{
        const fetchGame = async ()=>{
            const res = await fetch(`http://localhost:3000/api/Games/${slug}`)
            const {game} = await res.json()
            setGame(game) 
        }
        fetchGame()
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
                if(review.userId===orders[0].userId){
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
            [name]:name==="rating"?Number(value):value
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
    <div>
        <form onSubmit={handleSubmit}>
            <label className="">Title: <input type="text" name="title" value={reviewData.title} className="" placeholder="Type title" onChange={handleChange} required></input></label>
            <label className="">Description: <textarea name="description" value={reviewData.description} className="font-normal whitespace-pre-wrap break-words" placeholder="Type description" onChange={handleChange} required></textarea></label>
            <label className="">Rating: <input type="number" name="rating" value={reviewData.rating} className="" placeholder="Enter Rating" onChange={handleChange} min={1} max={5} required></input></label>
            <button type="submit">Post</button>
        </form>
         <div>
          {game?.reviews?.map((review:ReviewType,index:number)=>(
            <div key={index}>
               <p>Title: {review.title}</p>
               <p>Description: {review.description}</p>
               <p>Rating {review.rating}</p>
            </div>
          ))}
        </div>
    </div>
  )
}else if(flag==="posted"){
    return(
        <div>Update
        <div>
          {game?.reviews?.map((review:ReviewType,index:number)=>(
            <div key={index}>
               <p>Title: {review.title}</p>
               <p>Description: {review.description}</p>
               <p>Rating {review.rating}</p>
            </div>
          ))}
        </div>
        </div>
        
    )
}
else{
    return(
        <div></div>
    )
}
}

export default ReviewForm