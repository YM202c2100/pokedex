"use client"

import { useEffect, useState } from "react"
import { fetchFromPokeAPI } from "../actions/getPokemon"
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
  const {ref, inView} = useInView()

  const loadMorePokemons = async ()=>{
    let fetchedPokemons:Pokemon[] =  await fetchFromPokeAPI()
    if(search){
      fetchedPokemons = fetchedPokemons.filter(pokemon => pokemon.name.startsWith(search))
    }
    setPokemons([...pokemons, ...fetchedPokemons])
  }

  useEffect(()=>{
    if(inView){
      console.log("inview")
      loadMorePokemons()
    }
  },[inView])

  return(<>
    <div className="flex flex-wrap w-[900px] m-auto">
      {pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>)}
    </div>
    <div ref={ref} className="bg-red-400">inview</div>
  </>)
}

export default LoadPokemon
export type {Pokemon}