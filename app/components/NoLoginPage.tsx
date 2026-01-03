import { redirect } from "next/navigation"
import Link from "next/link"

const NoLoginPage = () => {
  redirect('/login')
  return (
    <div className="div">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
  )
}
export default NoLoginPage