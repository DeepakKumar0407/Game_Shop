"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


const Create = () => {
  const {data:session} = useSession()
  const[isLoading,setIsLoading] = useState(false)
  const[submitted,setSubmitted] = useState(false)
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
    <div className="font-robo mt-10 text-white">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return (
    <div className="font-robo text-white md:max-w-7/10 max-w-full mx-auto bg-foreground/10 mb-15">
      <h1 className="text-3xl font-bold mt-5 mb-5 p-3 text-center bg-foreground/70">Add a Game</h1>
      <form className="w-full flex flex-wrap justify-around ml-4" onSubmit={handleSubmit}>
          <label className="label">Title: <input type="text" name="title" onChange={handleChange} value={gameData.title} placeholder="Enter title" className="input" required maxLength={100}></input></label>
          <label className="label">Developer:<input type="text" name="developer" onChange={handleChange} value={gameData.developer} placeholder="Enter developer" className="input" required maxLength={100}></input></label>
          <label className="label">Producer: <input type="text" name="producer" onChange={handleChange} value={gameData.producer} placeholder="Enter producer" className="input" required maxLength={100}></input></label>
          <label className="label">Price: <input type="tel" name="price" onChange={handleChange} value={gameData.price} placeholder="Enter price" className="input" required maxLength={10}></input></label>
          <label className="label">Genre: <input type="text" name="tags" onChange={handleChange} value={gameData.tags} placeholder="Enter,genre,example" className="input" required maxLength={50}></input></label>
          <label className="label">Platform: <input type="text" name="platform" onChange={handleChange} value={gameData.platform} placeholder="Enter,platform,example" className="input" required maxLength={100}></input></label>
          <label className="label">Image: <input type="file" name="image" onChange={(e)=>{setGameData(gameData=>({...gameData,image:e.target.files?.[0]||null}))}} className="input" required></input></label>
          <label className="label">Release Date: <input type="date" name="releaseDate" onChange={handleChange} value={gameData.releaseDate} className="block text-[#807F80]" required></input></label>
          <label className="font-bold text-2xl block w-full text-center mt-2">Description<textarea name="description" onChange={handleChange} value={gameData.description} placeholder="    Write game details" className="font-normal whitespace-pre-wrap break-words block w-9/10 placeholder:font-bold border-2 rounded-xl border-foreground" required maxLength={2000}></textarea></label>
          <div className="w-full flex justify-center mt-3 mb-3">
            <button type="submit" className="cursor-pointer w-2/10 h-full bg-green-800 rounded p-2 hover:bg-green-500" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Submit</button>
          </div>
          <p>{isLoading&&'Loading...'}{submitted&& 'Game Submitted'}</p>
        </form>
    </div>
  )
  }
  
}
export default Create