import type { Pokemon } from "../components/loadPokemon"

const fetchFromPokeAPI = async ()=> {
  let endPoint = `https://pokeapi.co/api/v2/pokemon?limit=10000`
  const fetchedData = await fetch(endPoint).then((result)=>result.json())
  return fetchedData.results
}

const filteringPokemons = ({search, fetchedData, offset}
:{
  search:string,
  fetchedData:Pokemon[],
  offset:number
 }) => {
  let filterdData:Pokemon[] = [];
  let i=offset
  while(filterdData.length !== 24){
    if(fetchedData[i].name.startsWith(search)){
      fetchedData.push(fetchedData[i])
    }
    i++
  }

  return filterdData
}

export {fetchFromPokeAPI}
