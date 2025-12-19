import ConnectDb from "@/lib/mongodb";
import Image from "next/image";

export default async function Home() {
  await ConnectDb()
  return (
    <div className="">
      Home
    </div>
  );
}
