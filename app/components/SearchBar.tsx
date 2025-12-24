"use client"

import Link from "next/link"
import { useState } from "react"

const SearchBar = () => {
    const[search,setSearch] = useState('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
 
  return (
    <div>
        <form>
            <input type="text" name="search" value={search} placeholder="search" onChange={handleChange}required></input>
            <Link href={`http://localhost:3000/search/${search}`}>S</Link>
        </form>
    </div>
  )
}
export default SearchBar