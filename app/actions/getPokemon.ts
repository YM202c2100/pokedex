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
  while(true){
    if(fetchedData[i].name.startsWith(search)){
      filteredData.push(fetchedData[i])
      if(filteredData.length === 24){
        break
      }
    }
    i++
    if(i >= fetchedData.length){
      i = -1
      break
    }
  }

  return {filteredData:filteredData, newOffset:i}
}

export {fetchFromPokeAPI, filteringPokemons}
