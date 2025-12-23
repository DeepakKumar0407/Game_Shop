"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { UserType } from "../database/user.model"
import { redirect } from "next/navigation"
const RegisterForm = () => {
    const initialData:UserType = {
        email:"",
        phone:"",
        name:"",
        password:"",
    }
    const [userData , setUserData] = useState(initialData)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setUserData(userData=>({
            ...userData,
            [name]:value
        }))
    }
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/auth/register`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(userData)

        })
        const {message} = await res.json()
        if(message === 'User Created'){
            redirect('/login')
        }
    }
  return (
   <form onSubmit={handleSubmit}>
    <label>Name: <input type="text" value={userData.name} placeholder="Enter Name" name="name" className="" onChange={handleChange}></input></label>
    <label>Phone:<input type="tel" value={userData.phone} placeholder="Enter Phone" name="phone" className="" onChange={handleChange}></input></label>
    <label>Email: <input type="email" value={userData.email} placeholder="Enter Email" name="email" className="" onChange={handleChange}></input></label>
    <label>Password: <input type="password" value={userData.password} placeholder="Enter Password" name="password" className="" onChange={handleChange}></input></label>
    <button type="submit">Submit</button>
   </form>
  )
}
export default RegisterForm