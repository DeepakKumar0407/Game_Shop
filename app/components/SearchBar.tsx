"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Link from "next/link"
import { useState } from "react"

const SearchBar = () => {
    const[search,setSearch] = useState('')
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
    }
  return (
    <div>
        <form className='flex justify-baseline gap-1' onSubmit={handleSubmit}>
            <input type="text" name="search" value={search} placeholder="search" onChange={handleChange}required></input>
            <Link href={search===''?"":`http://localhost:3000/search/${search}`} ><MagnifyingGlassIcon className='w-5 h-5'/></Link>
        </form>
    </div>
  )
}
export default SearchBar