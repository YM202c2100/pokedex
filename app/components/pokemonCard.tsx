import type { Pokemon } from "./loadPokemon"

interface Props{
  pokemon:Pokemon
}
const PokemonCard:React.FC<Props> = ({pokemon}) =>{
  return(
    <div className="h-[30px] mb-10">{pokemon.name}</div>
  )
}

export default PokemonCard