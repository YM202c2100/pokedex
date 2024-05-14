import Image from "next/image"

import type { Pokemon } from "./loadPokemon"
import { useEffect, useState } from "react"

interface Props{
  pokemon:Pokemon
}

interface FetchedDataFormat{
  name:string,
  order:number,
  types:{type:{name:string}}[]
  sprites:{other:{"official-artwork":{front_default:string, front_shiny:string}}}
}

interface PokemonInfo{
  name:string,
  order:number,
  types:string[],
  spriteUrl:string
}
const PokemonCard:React.FC<Props> = ({pokemon}) =>{
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>({name:"bulbasaur", order:0, types:["grass", "pison"], spriteUrl:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"})

  const fetchPokemonInfo = async (pokemon:Pokemon)=>{
    const fetchedInfo:FetchedDataFormat = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                                                .then(res => res.json())
    const types:string[] = fetchedInfo.types.map(typeInfo => typeInfo.type.name)
    const newPokemonInfo:PokemonInfo = {name:pokemon.name,
                                        order:fetchedInfo.order,
                                        types:types,
                                        spriteUrl:fetchedInfo.sprites.other["official-artwork"].front_default}
    setPokemonInfo(newPokemonInfo)
  }

  useEffect(()=>{
    fetchPokemonInfo(pokemon)
  },[])

  return(
    <Image src={pokemonInfo.spriteUrl}
           alt={`Image of ${pokemonInfo?.name}`}
           width={300}
           height={300}
    />
  )
}

export default PokemonCard