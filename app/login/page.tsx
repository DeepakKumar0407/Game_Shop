import { getServerSession } from "next-auth";
import LoginForm from "../components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession()
  if (!session) {
   return(
    <div className="">
        <LoginForm />
    </div>
   )
  } else {
    redirect('/')
  }
}