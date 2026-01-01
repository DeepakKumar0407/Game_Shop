"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [loginFailed,setLoginFailed] = useState(false)
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
      if(!res?.ok){
        setLoginFailed(true)
      }
      if(res?.ok){
        setLoginFailed(false)
        redirect('/')
      }
    }
  return (
  <div className="font-robo text-white w-1/3 mx-auto bg-foreground/20 p-3 rounded-xl">
    <h1 className="text-4xl text-center font-bold mb-5">Login</h1>
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      <label className="label_login">Email: <input type="email" value={userData.email} placeholder="Enter Email" name="email" className="input_login" onChange={handleChange} required></input></label>
      <label className="label_login">Password: <input type="password" value={userData.password} placeholder="Enter Password" name="password" className="input_login" onChange={handleChange} required></input></label>
      <p className="text-xs md:text-xl">{loginFailed&&"Login Failed"}</p>
      <div className="flex justify-around w-full">
        <Link href={"/register"} className="cursor-pointer w-1/3 h-full bg-gray-600  rounded p-2 hover:bg-white text-center text-black" >Sign up</Link>
        <button type="submit" className="cursor-pointer w-1/3 h-full bg-green-800 rounded p-2 hover:bg-green-500 text-center" >Login</button>
      </div>
    </form>
   </div>
  )
}
export default LoginForm