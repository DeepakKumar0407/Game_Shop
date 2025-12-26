import { headers } from "next/headers"
const page = async () => {
const head = await headers()
const res = await fetch('http://localhost:3000/api/user',{
    method:"GET",
    headers:Object.fromEntries(head.entries())
})
  const {user}= await res.json()
  console.log({user},'hello')
  return (
    <div>page</div>
  )
}
export default page