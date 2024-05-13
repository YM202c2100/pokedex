"use client"

import { useEffect, useState } from "react"
import { fetchFromPokeAPI } from "../actions/getPokemon"
import { useInView } from "react-intersection-observer"

interface Props{
  search:string | undefined
}

interface Pokemon{
  name:string,
  url:string
}

const LoadPokemon:React.FC<Props> = ({search})=>{
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const {ref, inView} = useInView()

  const loadMorePokemons = async (page:number)=>{
    const fetchedPokemons =  await fetchFromPokeAPI({offset:(page-1)*24})
    setPokemons([...pokemons, ...fetchedPokemons])
  }

  useEffect(()=>{
    if(inView){
      console.log("inview")
      loadMorePokemons(page)
    }
  },[inView])

  return(<>
    <div className=" bg-slate-500">
      {pokemons.map(pokemon => <div>{pokemon.name}</div>)}
    </div>
    <div ref={ref} className="bg-red-400">inview</div>
  </>)
}

export default LoadPokemon