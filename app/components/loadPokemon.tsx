"use client"

import { useEffect, useState } from "react"

import { fetchFromPokeAPI, filteringPokemons } from "../actions/getPokemon"
import { useInView } from "react-intersection-observer"

import PokemonCard, { FetchedDataFormat } from "./pokemonCard"

interface Props{
  search:string
}

interface Pokemon{
  name:string,
  url:string,
  info?:FetchedDataFormat
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
      if(newPokemons.length === amountFetching){
        setOffset((prev) => prev+amountFetching)
      }else{
        setOffset(-1)
      }
    }
    // setPokemons([...pokemons, ...newPokemons])
    return [...pokemons, ...newPokemons]
  }

  const initLoadPokemons = async ()=>{
    const fetchedPokemons:Pokemon[] =  await fetchFromPokeAPI()
    let newPokemons:Pokemon[]
    if(search){
      const filteredResult = filteringPokemons({search:search,fetchedData:fetchedPokemons,offset:0})
      newPokemons = filteredResult.filteredData
      setOffset(filteredResult.newOffset)
    }else{
      newPokemons = fetchedPokemons.slice(0, amountFetching)
      setOffset(amountFetching)
    }
    // setPokemons(newPokemons)
    return newPokemons
  }

  useEffect(()=>{
    const fetchPokemonInfo = async(pokemon:Pokemon)=>{
      const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
      pokemon.info = info
      return pokemon
    }

    const updatePokemons = async() =>{
      const selectedPokemons = await initLoadPokemons()
      const pokemonPromises = selectedPokemons.map(pokemon => fetchPokemonInfo(pokemon))
      const newPokemons:Pokemon[] = await Promise.all(pokemonPromises)
      setPokemons(newPokemons)
    }
    //setLoading
    updatePokemons()
  },[search])

  useEffect(()=>{
    if(inView && offset >= 0){
      const fetchPokemonInfo = async(pokemon:Pokemon)=>{
        const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
        pokemon.info = info
        return pokemon
      }
  
      const updatePokemons = async() =>{
        const selectedPokemons:Pokemon[] = await loadMorePokemons()
        const pokemonPromises = selectedPokemons.map(pokemon => fetchPokemonInfo(pokemon))
        const newPokemons:Pokemon[] = await Promise.all(pokemonPromises)
        setPokemons(newPokemons)
      }
      //setLoading
      updatePokemons()
    }
  },[inView])

  return(<>
        {pokemons.length !== 0 ? (
          <div>
            <div className="flex justify-center flex-wrap w-full mx-auto mt-28 md:mt-16">
            {pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>)}
            </div>
            <div ref={ref}>　</div>
          </div>
        ) : (
          <p className="mt-36 text-4xl">見つかりませんでした</p>
        )}
    </>)
}

export default LoadPokemon
export type {Pokemon}