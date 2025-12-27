"use client"
import { useEffect, useState } from "react"
import { UserAddress, UserType } from "../database/user.model"
import { useSession } from "next-auth/react"

const AddressForm = ({props}:{props:any}) => {
    const head = props
    const [user,setUser] = useState<UserType&{_id:any}>()
     const userAddress:any = user?.address
    useEffect(()=>{
        const fetchUser = async()=>{
            const res = await fetch("http://localhost:3000/api/user",{
            method:"GET",
            headers:Object.fromEntries(head.entries())
          })
          const {user:userData} = await res.json()
          setUser(userData)
        }
        fetchUser()
    },[userAddress])
     const initialData:UserAddress = {
        flat:"",
        street:"",
        area:"",
        city:"",
        state:"",
        country:"",
        pincode:""
      }
      const [addressData,setAddressData] = useState(initialData)
    
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setAddressData(addressData=>({
          ...addressData,
          [name]:value
        }))
      }
      const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try { 
          const res = await fetch("http://localhost:3000/api/user",{
            method:"PUT",
            body:JSON.stringify(addressData)
          })
        } catch (error) {
          console.error(error)
        }
      }
        const handleDelete = async (id:any)=>{
        try { 
            const ids = {
                userId:user?._id,
                addressId:id
            }
            const res = await fetch("http://localhost:3000/api/user",{
            method:"DELETE",
            body:JSON.stringify(ids)
          })
        } catch (error) {
          console.error(error)
        }
      }
      const {data:session} = useSession()
  return (
      <div className="flex justify-baseline gap-4">
      <form className="flex flex-wrap mt-5 justify-center w-3/5 gap-2 bg-linear-to-t to-[#4d6ec2] from-[#24335f] py-8 rounded-2xl" onSubmit={handleSubmit}>
          <label className="label">Flat: <input type="text" name="flat" onChange={handleChange} value={addressData.flat} placeholder="Enter flat" className="input" required ></input></label>
          <label className="label">Street: <input type="type" name="street" onChange={handleChange} value={addressData.street} placeholder="Enter street" className="input" required ></input></label>
          <label className="label">Area: <input type="text" name="area" onChange={handleChange} value={addressData.area} placeholder="Enter area" className="input" required ></input></label>
          <label className="label">City: <input type="text" name="city" onChange={handleChange} value={addressData.city} placeholder="Enter city" className="input" required></input></label>
          <label className="label">State: <input type="text" name="state" onChange={handleChange} value={addressData.state} placeholder="Enter state" className="input"></input></label>
          <label className="label">Country: <input type="text" name="country" onChange={handleChange} value={addressData.country} placeholder="Enter country" className="input"></input></label>
          <label className="label">Pincode: <input type="text" name="pincode" onChange={handleChange} value={addressData.pincode} placeholder="Enter pincode" className="input"></input></label>
          <div className="label justify-center bg-green-800 rounded p-2 hover:bg-green-500">
            <button type="submit" className="cursor-pointer w-full h-full" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Submit</button>
          </div>
        </form>
        <div className="w-1/3">
           {userAddress&&userAddress.map((address:UserAddress&{_id:any})=>(
            <div key={address._id}>
            <p >{Object.values(address).slice(0,6).join(',')}</p>
            <button onClick={()=>handleDelete(address._id)}>Delete</button>
            </div>
           ))}
        </div>
    </div>
  )
}
export default AddressForm