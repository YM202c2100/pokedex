import LoadPokemon from "./components/loadPokemon";
import Search from "./components/search";

export default function Page({searchParams}
:{
  searchParams:{[key:string]:string | undefined};
}){
  const searchQuery:string|undefined = searchParams.search ?
                                       searchParams.search :
                                       undefined

  return (<>
    <Search/>
    <LoadPokemon search={searchQuery}/>
  </>)
}
