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
            <Link href="/" className="link_nav">Home</Link>
            <Link href="/games" className="link_nav">Games</Link>
            <Link href="/create" className="link_nav">Create</Link>
            <Link href="/about" className="link_nav">About</Link>
        </div>
    </div>
  )
}
export default NavBar