import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Link from "next/link";
import AddressForm from "../components/AddressForm";
import NoLoginPage from "../components/NoLoginPage";

const Address = async () => {
 const session = await getServerSession()
 const head = await headers()
  if (!session) {
   return(
   <NoLoginPage/>
   )
  } else {
    return (
      <AddressForm props={head}/>
  )
  }
  
}
export default Address