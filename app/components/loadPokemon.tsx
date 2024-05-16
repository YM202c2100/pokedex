"use client"

import { useEffect, useState } from "react"
import { fetchFromPokeAPI, filteringPokemons } from "../actions/getPokemon"
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
  const amountFetching:number = 24
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [offset, setOffset] = useState<number>(0)
  const {ref, inView} = useInView()

  const loadMorePokemons = async ()=>{
    const fetchedPokemons:Pokemon[] =  await fetchFromPokeAPI()
    let newPokemons:Pokemon[]

    if(search){
      const filterdResult = filteringPokemons({
        search:search,
        fetchedData:fetchedPokemons,
        offset:offset
      })
      newPokemons = filterdResult.filterdData
      setOffset(filterdResult.newOffset)
    }else{
      newPokemons = fetchedPokemons.slice(offset, offset+amountFetching)
      setOffset(prev => prev+amountFetching)
    }
    setPokemons([...pokemons, ...newPokemons])
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