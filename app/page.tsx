import LoadPokemon from "./components/loadPokemon";
import Search from "./components/search";

export default async function Page({searchParams}
:{
  searchParams:{[key:string]:string};
}){
  return (
    <div className="container flex flex-col items-center mx-auto">
      <Search/>
      <LoadPokemon 
        search={searchParams.search} 
      />
    </div>
  )
}
