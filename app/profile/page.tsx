"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const UserProfile = () => {
const {data:session} = useSession()
 if (!session) {
   return(
    <div>
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return(
      <div>
        <button onClick={()=>signOut()}>Logout</button>
      </div>
    )
  }
}
export default UserProfile