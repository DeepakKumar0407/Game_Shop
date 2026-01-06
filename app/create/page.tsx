"use client"
import { useState } from "react";
import Editor from 'react-simple-wysiwyg';
const Create = () => {
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
    return (
    <div className="div_create">
      <h1 className="h1_create">Add a Game</h1>
      <form className="w-full flex flex-wrap justify-around ml-4" onSubmit={handleSubmit}>
          <label className="label">Title: <input type="text" name="title" onChange={handleChange} value={gameData.title} placeholder="Enter title" className="input" required maxLength={100}></input></label>
          <label className="label">Developer:<input type="text" name="developer" onChange={handleChange} value={gameData.developer} placeholder="Enter developer" className="input" required maxLength={100}></input></label>
          <label className="label">Producer: <input type="text" name="producer" onChange={handleChange} value={gameData.producer} placeholder="Enter producer" className="input" required maxLength={100}></input></label>
          <label className="label">Price: <input type="tel" name="price" onChange={handleChange} value={gameData.price} placeholder="Enter price" className="input" required maxLength={10}></input></label>
          <label className="label">Genre: <input type="text" name="tags" onChange={handleChange} value={gameData.tags} placeholder="Enter,genre,example" className="input" required maxLength={50}></input></label>
          <label className="label">Platform: <input type="text" name="platform" onChange={handleChange} value={gameData.platform} placeholder="Enter,platform,example" className="input" required maxLength={100}></input></label>
          <label className="label">Image: <input type="file" name="image" onChange={(e)=>{setGameData(gameData=>({...gameData,image:e.target.files?.[0]||null}))}} className="input" required></input></label>
          <label className="label">Release Date: <input type="date" name="releaseDate" onChange={handleChange} value={gameData.releaseDate} className="block text-[#807F80]" required></input></label>
          <label className="label_description text-center mb-5">Description</label>
           <Editor value={gameData.description} onChange={(e)=>setGameData(state=>({...state,description:e.target.value}))} className="text-white" />
          <div className="w-full flex justify-center mt-3 mb-3">
            <button type="submit" className="button_submit" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Submit</button>
          </div>
          <p>{isLoading&&'Loading...'}{submitted&& 'Game Submitted'}</p>
        </form>
    </div>
  )
  }
  
export default Create