"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginForm = () => {
    interface LoginUserType{
        email:string;
        password:string;
    }
    const initialData:LoginUserType = {
        email:"",
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
        const res = await signIn("credentials", {
        email:userData.email,
        password:userData.password,
        redirect: false,
      });
      if(res?.ok){
        redirect('/')
      }
    }
  return (
   <form onSubmit={handleSubmit}>
    <label>Email: <input type="email" value={userData.email} placeholder="Enter Email" name="email" className="" onChange={handleChange}></input></label>
    <label>Password: <input type="password" value={userData.password} placeholder="Enter Password" name="password" className="" onChange={handleChange}></input></label>
    <button type="submit">Submit</button>
   </form>
  )
}
export default LoginForm