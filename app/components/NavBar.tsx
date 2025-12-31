import Link from "next/link"
import AddressHelper from "./addressHelper"
import Image from "next/image"

const NavBar = () => {
  return (
    <div className="flex justify-around bg-foreground font-robo">
        <div className="m-3">
           <Image src="/logo2.png" alt="logo" width={200} height={100}/>
        </div>
        <AddressHelper/>
        <div className="flex justify-around items-center gap-2">
            <Link href="/" className="hover:bg-red-800 border-2 border-white rounded-2xl p-4 text-white font-bold">Home</Link>
            <Link href="/games" className="hover:bg-red-800 border-2 border-white rounded-2xl p-4 text-white font-bold">Games</Link>
            <Link href="/create" className="hover:bg-red-800 border-2 border-white rounded-2xl p-4 text-white font-bold">Create</Link>
            <Link href="/about" className="hover:bg-red-800 border-2 border-white rounded-2xl p-4 text-white font-bold">About</Link>
        </div>
    </div>
  )
}
export default NavBar