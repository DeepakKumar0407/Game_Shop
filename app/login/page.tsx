import { getServerSession } from "next-auth";
import LoginForm from "../components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession()
  if (!session) {
   return(
    <div className="font-robo mt-10 text-white">
        <LoginForm />
    </div>
   )
  } else {
    redirect('/')
  }
}