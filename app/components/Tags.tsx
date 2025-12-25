import Link from "next/link"

const Tags = async () => {
    const res = await fetch("http://localhost:3000/api/tags")
    const {tags} = await res.json()
  return (
    <div className="">
        {tags[0].allTags.map((tag:string)=>(
            <div key={tag}>
            <Link href={`/search/${tag}`}>{tag[0].toUpperCase().concat(tag.slice(1))}</Link>
            </div>
        ))}
    </div>
  )
}
export default Tags