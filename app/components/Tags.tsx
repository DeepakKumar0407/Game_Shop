"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const Tags = ({props}:{props:any}) => {
  const tags = props
  const [flag,setFlag] = useState(true)
  const [tagArr, setTagArr] = useState<string[]>([])
  const regex = /^\s*\S+\s*$/
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
      <div className={`${flag?'hidden':'visible'} overflow-y-scroll h-50 md:h-100 tags`}>
        {tagArr.sort().map((tag:string,index:number)=>(
            <div key={index} className="p-1 pl-2 pr-2 bg-foreground">
            <Link href={`/search/${tag}`} onClick={handleDropDown} className="hover:text-black">{tag[0].toUpperCase().concat(tag.slice(1))}</Link>
            </div>
        ))}
      </div>
    </div>
  )
}
export default Tags