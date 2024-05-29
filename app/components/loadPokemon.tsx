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
  info:FetchedDataFormat
}

const LoadPokemon:React.FC<Props> = ({search})=>{
  const amountFetching:number = 24
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [offset, setNextOffset] = useState<number>(0)
  const [isloading, setLoading] = useState<boolean>(false)
  const {ref, inView} = useInView()

  const loadPokemons = async ({initDisplay}:{initDisplay:boolean})=>{
    const fetchedPokemons:Pokemon[] =  await fetchFromPokeAPI()
    let newPokemons:Pokemon[]

    if(search){
      const filteredResult = filteringPokemons({search:search,
                                                fetchedData:fetchedPokemons,
                                                offset:(initDisplay) ? 0:offset
                                              })
      newPokemons = filteredResult.filteredData
      setNextOffset(filteredResult.newOffset)
    }else{
      newPokemons = (initDisplay) ? fetchedPokemons.slice(0, amountFetching)
                                  : fetchedPokemons.slice(offset, offset+amountFetching)
      if(initDisplay){
        setNextOffset(amountFetching)
      }else if(newPokemons.length === amountFetching){
        setNextOffset((prev) => prev+amountFetching)
      }else{
        setNextOffset(-1)
      }
    }

    return (initDisplay) ? newPokemons : [...pokemons, ...newPokemons]
  }

  const fetchPokemonInfo = async(pokemon:Pokemon):Promise<Pokemon> => {
    const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
    pokemon.info = info
    return pokemon
  }

  const updatePokemons = async(loadFunction : ()=>Promise<Pokemon[]>) =>{
    const selectedPokemons:Pokemon[] = await loadFunction()
    const pokemonPromises:Promise<Pokemon>[] = selectedPokemons.map(pokemon => fetchPokemonInfo(pokemon))
    const newPokemons:Pokemon[] = await Promise.all(pokemonPromises)
    setPokemons(newPokemons)
    setLoading(false)
  }

  useEffect(()=>{
    setLoading(true)
    updatePokemons(()=>loadPokemons({initDisplay:true}))
  },[search])

  useEffect(()=>{
    if(inView && offset >= 0){
      setLoading(true)
      updatePokemons(()=>loadPokemons({initDisplay:false}))
    }
  },[inView])

  return(<>
      {(pokemons.length === 0) && (!isloading) && <p className="mt-36 text-4xl">見つかりませんでした</p>}

      <div className="flex justify-center flex-wrap w-full mx-auto mt-36 md:mt-16">
        {pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon}/>)}
      </div>
      {isloading ? <div className="text-2xl my-28">Loading...</div>:<div ref={ref}>　</div>}

    </>)
}

export default LoadPokemon
export type {Pokemon}