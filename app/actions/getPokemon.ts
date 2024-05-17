import type { Pokemon } from "../components/loadPokemon"

const fetchFromPokeAPI = async ()=> {
  let endPoint = `https://pokeapi.co/api/v2/pokemon?limit=10000`
  const fetchedData = await fetch(endPoint).then((result)=>result.json())
  return fetchedData.results
}

interface filteredResult{
  filteredData:Pokemon[],
  newOffset:number
}

const filteringPokemons = ({search, fetchedData, offset}
:{
  search:string,
  fetchedData:Pokemon[],
  offset:number
 }):filteredResult => {

  let i=offset
  let filteredData:Pokemon[] = [];
  while(filteredData.length !== 24){
    if(fetchedData[i].name.startsWith(search)){
      filteredData.push(fetchedData[i])
    }
    i++
  }

  return {filteredData:filteredData, newOffset:i}
}

export {fetchFromPokeAPI, filteringPokemons}
