import { FetchFromPokeAPI } from "./actions/getPokemon"

export default function Page() {
  FetchFromPokeAPI({offset:10})
  // FetchFromPokeAPI2()
  return <h1>Root Page</h1>

}
