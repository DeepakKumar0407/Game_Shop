import Link from "next/link"
import SearchBar from "./SearchBar"
import Tags from "./Tags"

const SubNavBar = () => {
  return (
    <div className="flex justify-around bg-yellow-400">
        <div className="flex justify-baseline gap-2 flex-col">
            <Tags/>
        </div>
        <div><SearchBar/></div>
        <div>
            <Link href={`http://localhost:3000/cart`}>Cart</Link>
            <Link href="/profile">Profile</Link>
        </div>
    </div>
  )
}
export default SubNavBar