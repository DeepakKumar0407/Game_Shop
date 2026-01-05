import { headers } from "next/headers";
import AddressForm from "../components/AddressForm";

const Address = async () => {
 const head = await headers()
    return (
      <AddressForm props={head}/>
  )
  }
export default Address