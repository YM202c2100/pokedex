"use client"

import { useEffect, useState } from "react"
import { fetchFromPokeAPI, filteringPokemons } from "../actions/getPokemon"
import { useInView } from "react-intersection-observer"

import PokemonCard from "./pokemonCard"

interface Props{
  search:string
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
      const filteredResult = filteringPokemons({search:search,fetchedData:fetchedPokemons,offset:offset})
      newPokemons = filteredResult.filteredData
      setOffset(filteredResult.newOffset)
    }else{
      newPokemons = fetchedPokemons.slice(offset, offset+amountFetching)
      setOffset(prev => prev+amountFetching)
    }
    setPokemons([...pokemons, ...newPokemons])
  }

  const initLoadPokemons = async ()=>{
    const fetchedPokemons:Pokemon[] =  await fetchFromPokeAPI()
    let newPokemons:Pokemon[]
    if(search){
      const filteredResult = filteringPokemons({search:search,fetchedData:fetchedPokemons,offset:0})
      newPokemons = filteredResult.filteredData
      setOffset(filteredResult.newOffset)
    }else{
      newPokemons = fetchedPokemons.slice(0, 24)
      setOffset(24)
    }
    setPokemons(newPokemons)
  }

  useEffect(()=>{
    console.log(`change search : ${search}`)
    initLoadPokemons()
  },[search])

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