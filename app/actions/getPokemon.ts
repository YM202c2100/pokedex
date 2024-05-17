import type { Pokemon } from "../components/loadPokemon"

const fetchFromPokeAPI = async ()=> {
  let endPoint = `https://pokeapi.co/api/v2/pokemon?limit=10000`
  const fetchedData = await fetch(endPoint).then((result)=>result.json())
  return fetchedData.results
}

interface filterdResult{
  filterdData:Pokemon[],
  newOffset:number
}

const filteringPokemons = ({search, fetchedData, offset}
:{
  search:string,
  fetchedData:Pokemon[],
  offset:number
 }):filterdResult => {

  let i=offset
  let filterdData:Pokemon[] = [];
  while(filterdData.length !== 24){
    if(fetchedData[i].name.startsWith(search)){
      filterdData.push(fetchedData[i])
    }
    i++
  }

  return {filterdData:filterdData, newOffset:i}
}

export {fetchFromPokeAPI, filteringPokemons}
