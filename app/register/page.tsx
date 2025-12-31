import { getServerSession } from "next-auth";
import RegisterForm from "../components/RegisterForm";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
 const session = await getServerSession()
  if (!session) {
   return(
    <div className="font-robo mt-10 text-white">
        <RegisterForm />
    </div>
   )
  } else {
    redirect('/login')
  }
}