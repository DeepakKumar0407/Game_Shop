import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Link from "next/link";
import AddressForm from "../components/AddressForm";

const Address = async () => {
 const session = await getServerSession()
 const head = await headers()
  if (!session) {
   return(
    <div className="font-robo mt-10 text-white">
    <p>You must be logged in to see this page</p>
    <Link href="/login">Login</Link>
    </div>
   )
  } else {
    return (
      <AddressForm props={head}/>
  )
  }
  
}
export default Address