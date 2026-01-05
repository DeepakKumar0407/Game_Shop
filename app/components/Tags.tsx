"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const Tags = ({props}:{props:any}) => {
  const tags = props
  const [flag,setFlag] = useState(true)
  const [tagArr, setTagArr] = useState<string[]>([])
  const regex = /[A-Za-z0-9]/
  useEffect(()=>{
    tags[0].allTags.map((tag:string)=>{
    regex.test(tag)?setTagArr(state=>([...state,tag.trim().toLowerCase()])):setTagArr(state=>([...state]))
  })
  },[tags])
  const handleDropDown = ()=>{
   if(flag){
    setFlag(false)
   }else{
    setFlag(true)
   }
  }
  return (
    <div className="absolute z-100 cursor-pointer">
      <p onClick={handleDropDown}>Tags</p>
      <div className={`${flag?'hidden':'visible'} overflow-y-scroll min-h-fit max-h-50 md:max-h-100 orders`}>
        {[...new Set(tagArr)].sort().map((tag:string,index:number)=>(
            <div key={index} className="p-1 pl-2 pr-2 bg-foreground">
            <Link href={`/search/${tag}`} onClick={handleDropDown} className="hover:text-black">{tag[0].toUpperCase().concat(tag.slice(1))}</Link>
            </div>
        ))}
      </div>
    </div>
  )
}
export default Tags