const SearchResults = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const res = await fetch(`http://localhost:3000/api/search/${decodeURIComponent(slug)}`)
  const games = await res.json()
  console.log(games)
  return (
    <div>SearchResults</div>
  )
}
export default SearchResults