"use Server"
export async function FetchFromPokeAPI({offset}:{offset:number}){
  let endPoint = `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`
  const fetchedData = await fetch(endPoint).then((result)=>result.json())
  console.log(fetchedData);
}
