const fetchAllFromPokeAPI = async ()=> {
  let endPoint = "https://pokeapi.co/api/v2/pokemon?limit=10000"
  const fetchedData = await fetch(endPoint).then((result)=>result.json())
  return fetchedData.results
}

export {fetchAllFromPokeAPI}
