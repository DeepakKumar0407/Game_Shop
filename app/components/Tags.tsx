"use client"
import Link from "next/link"
import { useState } from "react"

const Tags = ({props}:{props:any}) => {
  const tags = props
  const [flag,setFlag] = useState(true)
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
        {tags[0].allTags.map((tag:string)=>(
            <div key={tag} className={`${flag?'hidden':'visible'} p-1 pl-2 pr-2 bg-foreground`}>
            <Link href={`/search/${tag}`} onClick={handleDropDown}>{tag[0].toUpperCase().concat(tag.slice(1))}</Link>
            </div>
        ))}
    </div>
  )
}
export default Tags