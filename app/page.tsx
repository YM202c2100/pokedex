import LoadPokemon from "./components/loadPokemon";
import Search from "./components/search";

import type { Pokemon } from "./components/loadPokemon";

export default async function Page({searchParams}
:{
  searchParams:{[key:string]:string | undefined};
}){
  const searchQuery:string|undefined = searchParams.search ?
                                       searchParams.search :
                                       undefined

  const fetchedPokemons:Pokemon[] = await fetchFromPokeAPI()
  let initPokemons
  if(searchQuery){
    const filteredResult = filteringPokemons({search:searchQuery,fetchedData:fetchedPokemons,offset:0})
    initPokemons = filteredResult.filteredData
  }else{
    initPokemons = fetchedPokemons.slice(0, 24)
  }
  return (<>
    <Search/>
    <ul key={Math.random()}>
      <LoadPokemon 
        search={searchQuery} 
        initPokemons={initPokemons}
      />
    </ul>
    
  </>)
}
