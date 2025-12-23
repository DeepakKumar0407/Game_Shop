import Link from "next/link"

const SubNavBar = () => {
  return (
    <div className="flex justify-around bg-yellow-400">
        <div>
            <p>Tags</p>
        </div>
        <div>SearchBar</div>
        <div>
            <Link href={`http://localhost:3000/cart`}>Cart</Link>
            <Link href="/profile">Profile</Link>
        </div>
    </div>
  )
}
export default SubNavBar