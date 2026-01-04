"use client"
import { useEffect, useState } from "react"
import { GameTypeWithoutDoc } from "../database/game.model"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

const CalculateRating = ({game}:{game:GameTypeWithoutDoc}) => {
    const reviews = game.reviews
    const [totalScore,setTotalScore] = useState(0)
    const [averageScore,setAverageScore] = useState(0)
    const [averageDecimal,setAverageDecimal] = useState(0)
    useEffect(()=>{
        reviews?.map((review)=>{
            setTotalScore(state=>state+review.rating)
        })
        
    },[])
    useEffect(()=>{
        console.log(totalScore,reviews?.length)
         const calculateScore = (totalScore:number)=>{
            const average = totalScore/reviews?.length!
            return average
        }
        const calculateDecimal = (averageScore:number)=>{
            const decimal = averageScore - Math.floor(averageScore)
            return decimal
        }
    setAverageScore(calculateScore(totalScore))
    setAverageDecimal(calculateDecimal(averageScore))
    },[totalScore,averageScore])
   
  return (
    <div className="w-full flex justify-baseline gap-1" title={averageScore.toString()}>
        {Array.from({length:Math.floor(averageScore)}).map((s:any,index:number)=>(
            <div key={index} className="">
            <FontAwesomeIcon icon={faStar} />
            </div>
        ))}
        <div>{averageDecimal>0.25&&averageDecimal<=0.75?<FontAwesomeIcon icon={faStarHalfAlt}/>:averageDecimal>0.75?<FontAwesomeIcon icon={faStar} />:""}</div>
        <p className="text-gray-600">{`(${reviews?.length})`}</p>
    </div>
  )
}
export default CalculateRating