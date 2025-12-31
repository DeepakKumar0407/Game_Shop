import Link from "next/link"
import SearchBar from "./SearchBar"
import Tags from "./Tags"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { UserCircleIcon } from "@heroicons/react/24/outline"
const SubNavBar = async () => {
    const res = await fetch("http://localhost:3000/api/tags")
    const {tags} = await res.json()
  return (
    <div className="flex justify-around bg-foreground/50 text-white font-robo relative font-medium">
        <div className="flex justify-baseline gap-2 flex-col mt-3">
            <Tags props={tags}/>
        </div>
        <div className="mt-3"><SearchBar/></div>
        <div className="flex justify-baseline gap-2">
            <Link href={`http://localhost:3000/cart`}><ShoppingCartIcon className="w-8 h-8 mt-2 mb-2"/></Link>
            <Link href="/profile"><UserCircleIcon className="w-8 h-8 mt-2 mb-2"/></Link>
        </div>
    </div>
  )
}
export default SubNavBar