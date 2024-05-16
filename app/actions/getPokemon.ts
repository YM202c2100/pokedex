const fetchFromPokeAPI = async ({offset=1}:{offset?:number})=> {
  let endPoint = `https://pokeapi.co/api/v2/pokemon?limit=10000`
  const fetchedData = await fetch(endPoint).then((result)=>result.json())
  return fetchedData.results
}

export {fetchFromPokeAPI}
