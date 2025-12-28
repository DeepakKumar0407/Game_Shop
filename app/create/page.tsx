"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


const Create = () => {
  const {data:session} = useSession()
  interface GameStructureType{
    title:string;
    image:File|null;
    developer:string;
    description:string;
    releaseDate:string;
    producer:string;
    tags:string[];
    price:string;
    platform:string[];

  }
  const initialData:GameStructureType = {
    title:"",
    image:null,
    developer:"",
    producer:"",
    description:"",
    releaseDate:"",
    tags:[],
    price:"",
    platform:[],
  }
  const [gameData,setGameData] = useState(initialData)
  const[isLoading,setIsLoading] = useState(false)
  const[submitted,setSubmitted] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target
    setGameData(gameData=>({
      ...gameData,
      [name]:name==="tags"||name==="platform"?value.split(','):value,
    }))
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsLoading(true)
    setSubmitted(false)
    const data = new FormData
    Object.entries(gameData).forEach(([key,value])=>{
      data.append(key,value)
    })
    try {
      const res = await fetch("http://localhost:3000/api/Games",{
        method:"POST",
        body:data
      })
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
    setSubmitted(true)
  }
  if (!session) {
   return(
    <div>
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return (
    <div>
      <form className="flex flex-wrap mt-5 justify-center w-2/3 mx-auto gap-2 bg-linear-to-t to-[#4d6ec2] from-[#24335f] py-8 rounded-2xl" onSubmit={handleSubmit}>
          <label className="label">Title: <input type="text" name="title" onChange={handleChange} value={gameData.title} placeholder="Enter title" className="input" required maxLength={100}></input></label>
          <label className="label">Developer:<input type="type" name="developer" onChange={handleChange} value={gameData.developer} placeholder="Enter developer" className="input" required maxLength={100}></input></label>
          <label className="label">Producer: <input type="text" name="producer" onChange={handleChange} value={gameData.producer} placeholder="Enter producer" className="input" required maxLength={100}></input></label>
          <label className="label">Price: <input type="tel" name="price" onChange={handleChange} value={gameData.price} placeholder="Enter price" className="input" required maxLength={10}></input></label>
          <label className="label">Genre: <input type="text" name="tags" onChange={handleChange} value={gameData.tags} placeholder="Enter,genre,example" className="input" required maxLength={50}></input></label>
          <label className="label">Platform: <input type="text" name="platform" onChange={handleChange} value={gameData.platform} placeholder="Enter,platform,example" className="input" required maxLength={100}></input></label>
          <label className="label">Image: <input type="file" name="image" onChange={(e)=>{setGameData(gameData=>({...gameData,image:e.target.files?.[0]||null}))}} className="input" required></input></label>
          <label className="label">Release Date: <input type="date" name="releaseDate" onChange={handleChange} value={gameData.releaseDate} className="input" required></input></label>
          <label className="w-5/6 m-2 mr-0 font-bold text-xl flex items-center gap-1.5">Description<textarea name="description" onChange={handleChange} value={gameData.description} placeholder="Enter Descroption" className="input font-normal whitespace-pre-wrap break-words" required maxLength={2000}></textarea></label>
          <div className="label justify-center bg-green-800 rounded p-2 hover:bg-green-500">
            <button type="submit" className="cursor-pointer w-full h-full" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Submit</button>
          </div>
          <p>{isLoading&&'Loading...'}{submitted&& 'Game Submitted'}</p>
        </form>
    </div>
  )
  }
  
}
export default Create