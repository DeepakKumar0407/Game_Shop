import Link from "next/link"

const NavBar = () => {
  return (
    <div className="flex justify-around bg-red-800">
        <div>
            <p>LOGO</p>
        </div>
        <div className="flex justify-around gap-3">
            <Link href="/">Home</Link>
            <Link href="/games">Games</Link>
            <Link href="/create">Create</Link>
            <Link href="/about">About</Link>
        </div>
    </div>
  )
}
export default NavBar