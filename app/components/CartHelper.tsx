"use client"
const CartHelper = ({prop}:{prop:string}) => {
    const slug = prop
    const handleClick=async()=>{
        const res = await fetch("http://localhost:3000/api/cart",{
            method:"POST",
            headers:{
                'Content-Type': 'text/plain;charset=UTF-8'
            },
            body:slug
        })
    }
  return (
    <div>
        <button onClick={handleClick}>Add to cart</button>
    </div>
  )
}
export default CartHelper