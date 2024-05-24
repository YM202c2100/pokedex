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
  // const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>({name:"Pokemon", order:0, types:[""], spriteUrl:"/../../public/noimage.png"})

  const fetchPokemonInfo = async (pokemon:Pokemon)=>{
    const fetchedInfo:FetchedDataFormat = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                                                .then(res => res.json())
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
  }

  useEffect(()=>{
    fetchPokemonInfo(pokemon)
  },[])

  return(
    pokemonInfo &&
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