import type { Pokemon } from "./loadPokemon"
import { useEffect, useState } from "react"

interface Props{
  pokemon:Pokemon
}

interface PokemonInfo{
  name:string,
  order:number,
  types:string[]
}
const PokemonCard:React.FC<Props> = ({pokemon}) =>{
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>()

  const fetchPokemonInfo = async (pokemon:Pokemon)=>{
    const fetchedInfo:{types:{type:{name:string}}[], order:number} = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
    const types:string[] = fetchedInfo.types.map(typeInfo => typeInfo.type.name)
    const newPokemonInfo:PokemonInfo = {name:pokemon.name,
                                        order:fetchedInfo.order,
                                        types:types}
    setPokemonInfo(newPokemonInfo)
  }

  useEffect(()=>{
    fetchPokemonInfo(pokemon)
  },[])

  return(
    <div className="h-[30px] mb-10">{pokemon.name}</div>
  )
}

export default PokemonCard