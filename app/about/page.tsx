import { getServerSession } from "next-auth"
import Link from "next/link"
import NoLoginPage from "../components/NoLoginPage"


const About = async() => {
  const session = await getServerSession()
  if (!session) {
   return(
   <NoLoginPage/>
   )
  } else {
     return (
    <div className="mt-3 pb-15 font-robo text-white">
        <h1 className="text-center mb-5 text-4xl font-bold">About us</h1>
        <div className="div_about">
        <div className="div_about_left">
         <p className="text-xl">Welcome to Game Store, your go-to destination for discovering, buying, and enjoying great games.
          We're passionate gamers ourselves, and our goal is to make it easy for players of all kinds to find games they love—whether 
          you're into action-packed adventures, competitive multiplayer, or relaxing indie titles.<br/><br/>
          We work closely with developers and publishers to bring you a wide variety of games across multiple platforms, 
          all in one place. From new releases to timeless classics, we focus on quality, fair pricing, and a smooth shopping experience.
          At Game Store, we believe gaming is more than entertainment—it's a way to connect, explore new worlds, and have fun.
          That's why we're committed to building a store that's simple to use, trustworthy, and always growing with the gaming community.
          Thanks for being part of the journey.
          </p>
          </div>
          <div className="div_about_right">
            <h2 className="text-2xl">Contact us:</h2>
            <p><span className="text-xl">Email: </span> dummy.email092@gmail.com</p>
            <p><span className="text-xl">Number: </span>9822210394</p>
            <p><span className="text-xl">Adress: </span> 47 Lakeview Crescent<br/>
               Mumbai, Maharashtra 400001<br/>
               India
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4384216692265!2d72.79219247466658!3d19.132276950204467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b5fafa0d4c9d%3A0xb0b1a1ed6e265e54!2sMadh%20Fort!5e0!3m2!1sen!2sin!4v1765560928357!5m2!1sen!2sin"
              width="250"
              height="150">
            </iframe>
          </div>
          </div>
    </div>
  )
  }
 
}
export default About