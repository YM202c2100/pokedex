import LoadPokemon from "./components/loadPokemon";
import Search from "./components/search";

export default async function Page({searchParams}
:{
  searchParams:{[key:string]:string};
}){
  return (<>
    <Search/>
    <LoadPokemon 
      search={searchParams.search} 
    />
  </>)
}
