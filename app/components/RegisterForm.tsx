"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { UserType } from "../database/user.model"
import { redirect } from "next/navigation"
import Link from "next/link"
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
        const {message,error} = await res.json()
        if(message === 'User Created'){
            redirect('/login')
        }
        if(message === 'Something went wrong'){
            alert('Sign up failed')
        }
    }
  return (
    <div className="font-robo text-white w-1/3 mx-auto bg-foreground/20 p-3 rounded-xl mb-15">
        <h1 className="text-4xl text-center font-bold mb-5">Sign up</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            <label className="label_login">Name: <input type="text" value={userData.name} placeholder="Enter Name" name="name" className="input_login" onChange={handleChange} required></input></label>
            <label className="label_login">Phone:<input type="tel" value={userData.phone} placeholder="Enter Phone" name="phone" className="input_login" onChange={handleChange} required></input></label>
            <label className="label_login">Email: <input type="email" value={userData.email} placeholder="Enter Email" name="email" className="input_login" onChange={handleChange} required></input></label>
            <label className="label_login">Password: <input type="password" value={userData.password} placeholder="Enter password" name="password" className="input_login" onChange={handleChange} required></input></label>
            <p className="text-xs">Password must contain a capital,symbol & number</p>
            <div className="flex justify-around w-full">
            <Link href={"/login"} className="cursor-pointer w-1/3 h-full bg-gray-600  rounded p-2 hover:bg-white text-center text-black" >Login</Link>
            <button type="submit" className="cursor-pointer w-1/3 h-full bg-green-800 rounded p-2 hover:bg-green-500">Sign up</button>
            </div>
        </form>
    </div>
  )
}
export default RegisterForm