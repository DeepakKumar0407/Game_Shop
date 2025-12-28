import Link from "next/link"

const Footer = () => {
  return (
    <div className=" flex justify-between bg-yellow-800 fixed bottom-0 left-0 w-full">
        <div className="w-8/10">
            <p className="text-center">Text here</p>
        </div>
        <div className="w-1/10">
          <a href="#Top">Top</a>
        </div>
    </div>
  )
}
export default Footer