import User from "@/app/database/user.model";
import ConnectDb from "@/lib/mongodb";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

export const authOptions:AuthOptions = {
    session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
    providers: [
       CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await ConnectDb()
        const user = await User.findOne({email:credentials?.email})
        if (!user) {
            return null
        }
        const comparePassword = await bcrypt.compare(credentials?.password!, user.password);
        if(comparePassword){
            return {
            id: user._id.toString(),
            email: user.email,
            name: user.name
          };
        }
        return null;
      },
    }),
  ],

}

const handler = NextAuth(authOptions)
export {handler as GET,handler as POST}