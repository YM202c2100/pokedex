"use client"

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
  sprites:{other:{"official-artwork":{front_default:string|undefined, front_shiny:string}}}
}

interface PokemonInfo{
  name:string,
  order:number,
  types:string[],
  spriteUrl:string
}
const PokemonCard:React.FC<Props> = ({pokemon}) =>{
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>()

  useEffect(()=>{
    const fetchedInfo:FetchedDataFormat = pokemon.info
    const types:string[] = fetchedInfo.types.map(typeInfo => typeInfo.type.name)
    let spriteUrl:string
    if(fetchedInfo.sprites.other["official-artwork"].front_default){
      spriteUrl = fetchedInfo.sprites.other["official-artwork"].front_default
    }else{
      return
    }
    const newPokemonInfo:PokemonInfo = {name:pokemon.name,
                                        order:fetchedInfo.order,
                                        types:types,
                                        spriteUrl:spriteUrl}
    setPokemonInfo(newPokemonInfo)
  },[])
  
  return(
    <div className="bg-orange-50 m-6 rounded-3xl flex flex-col items-center shadow-lg">
      {pokemonInfo &&
        <Image src={pokemonInfo.spriteUrl}
           alt={`Image of ${pokemonInfo?.name}`}
           width={300}
           height={300}
        />
      }
      <span className="text-2xl">{pokemonInfo?.name}</span>
    </div>
    
  )
}

export default PokemonCard
export type {FetchedDataFormat}