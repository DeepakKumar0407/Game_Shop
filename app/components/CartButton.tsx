'use client'
const CartButton = ({prop}:{prop:string|undefined}) => {
    const game = prop
    const deleteGame = async (slug:string|undefined)=>{
    const res = await fetch("http://localhost:3000/api/cart",{
      method:"DELETE",
      body:slug
    })
  }
  return (
    <div><button onClick={()=>deleteGame(game)}>Delete</button></div>
  )
}
export default CartButton