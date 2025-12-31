import { ArrowLongUpIcon } from "@heroicons/react/24/solid"

const Footer = () => {
  return (
    <div className=" flex justify-between bg-foreground fixed bottom-0 left-0 w-full text-white font-robo items-center">
        <div className="w-8/10">
            <p className="text-center font-bold m-3">Game @ Deepak Kumar</p>
        </div>
        <div className="w-1/10">
          <a href="#Top">Top <ArrowLongUpIcon className="w-5 h-5 inline-block"/></a>
        </div>
    </div>
  )
}
export default Footer