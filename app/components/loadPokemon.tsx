"use client"

import { useEffect, useState } from "react"
import { fetchAllFromPokeAPI } from "../actions/getPokemon"
import { useInView } from "react-intersection-observer"

import PokemonCard from "./pokemonCard"

interface Props{
  search:string | undefined
}

interface Pokemon{
  name:string,
  url:string
}

const LoadPokemon:React.FC<Props> = ({search})=>{
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [offset, setOffset] = useState<number>(0)
  const {ref, inView} = useInView()

  const loadMorePokemons = async (offset:number)=>{
    const fetchedPokemons =  await fetchAllFromPokeAPI()
    const newPokemons = fetchedPokemons.slice(offset, offset+24)
    setPokemons([...pokemons, ...newPokemons])
  }

  useEffect(()=>{
    if(inView){
      console.log("inview")
      loadMorePokemons(offset)
      setOffset(prev => prev+24)
    }
  },[inView])

  return(<>
    <div className="flex flex-wrap w-[900px] m-auto">
      {pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>)}
    </div>
    <div ref={ref}></div>
  </>)
}

export default LoadPokemon
export type {Pokemon}