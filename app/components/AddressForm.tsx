"use client"
import { useEffect, useState } from "react"
import { UserAddress, UserType } from "../database/user.model"
import { TrashIcon } from "@heroicons/react/24/outline"

const AddressForm = ({props}:{props:any}) => {
    const head = props
    const [user,setUser] = useState<UserType&{_id:any}>()
    const userAddress:any = user?.address
    const [flag,setFlag] = useState(false)
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
    },[flag])
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
      const [isLoading,setIsLoading] = useState(false)
      const[submitted,setSubmitted] = useState(false)
    
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setAddressData(addressData=>({
          ...addressData,
          [name]:value
        }))
      }
      const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        setSubmitted(false)
        setIsLoading(true)
        e.preventDefault()
        try { 
          const res = await fetch("http://localhost:3000/api/user",{
            method:"PUT",
            body:JSON.stringify(addressData)
          })
          if(res.ok){
           window.location.reload()
          }
        } catch (error) {
          console.error(error)
        }
        flag === false?setFlag(true):setFlag(false)
          setIsLoading(false)
          setSubmitted(true)
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
        flag === false?setFlag(true):setFlag(false)
        setSubmitted(false)
        setIsLoading(false)
        window.location.reload()
      }

  return (
      <div className="div_address">
      <div className="div_address_left">
      <form className="form_address" onSubmit={handleSubmit}>
          <h1 className="h1_address">Add Address</h1>
          <label className="label mb-2">Flat: <input type="text" name="flat" onChange={handleChange} value={addressData.flat} placeholder="Enter flat" className="input" required ></input></label>
          <label className="label mb-2">Street: <input type="text" name="street" onChange={handleChange} value={addressData.street} placeholder="Enter street" className="input" required ></input></label>
          <label className="label mb-2">Area: <input type="text" name="area" onChange={handleChange} value={addressData.area} placeholder="Enter area" className="input" required ></input></label>
          <label className="label mb-2">City: <input type="text" name="city" onChange={handleChange} value={addressData.city} placeholder="Enter city" className="input" required></input></label>
          <label className="label mb-2">State: <input type="text" name="state" onChange={handleChange} value={addressData.state} placeholder="Enter state" className="input" required></input></label>
          <label className="label mb-2">Country: <input type="text" name="country" onChange={handleChange} value={addressData.country} placeholder="Enter country" className="input" required></input></label>
          <label className="label mb-2">Pincode: <input type="text" name="pincode" onChange={handleChange} value={addressData.pincode} placeholder="Enter pincode" className="input" required></input></label>
          <div className="w-full flex justify-center items-center mt-2 mb-2">
            <button type="submit" className="button_address" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Submit</button>
          </div>
          <p>{submitted&&"Address Submitted"}{isLoading&&"Loading..."}</p>  
        </form>
        </div>
        <div className="div_address_right orders">
           {userAddress&&userAddress.map((address:UserAddress&{_id:any})=>(
            <div key={address._id} className="">
            <p>{Object.values(address).slice(0,6).join(',')}</p>
            <button className="button_delete" onClick={()=>handleDelete(address._id)}><TrashIcon className="w-5 h-5"/></button>
            <hr/>
            </div>
           ))}
        </div>
    </div>
  )
}
export default AddressForm