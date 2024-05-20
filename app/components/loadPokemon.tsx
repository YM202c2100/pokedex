"use client"

import { useEffect, useState } from "react"
import { fetchFromPokeAPI, filteringPokemons } from "../actions/getPokemon"
import { useInView } from "react-intersection-observer"

import PokemonCard from "./pokemonCard"

interface Props{
  search:string | undefined,
  initPokemons: Pokemon[]
}

interface Pokemon{
  name:string,
  url:string
}

const LoadPokemon:React.FC<Props> = ({search, initPokemons})=>{
  const amountFetching:number = 24
  const [pokemons, setPokemons] = useState<Pokemon[]>(initPokemons)
  const [offset, setOffset] = useState<number>(24)
  const {ref, inView} = useInView()
  console.log(`offset on LoadPokemon called:${offset}`)

  const loadMorePokemons = async ()=>{
    console.log(`offset on loadMorePokemons called:${offset}`)
    const fetchedPokemons:Pokemon[] =  await fetchFromPokeAPI()
    let newPokemons:Pokemon[]

    if(search){
      const filteredResult = filteringPokemons({search:search,fetchedData:fetchedPokemons,offset:offset})
      newPokemons = filteredResult.filteredData
      setOffset(filteredResult.newOffset)
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