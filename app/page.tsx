import LoadPokemon from "./components/loadPokemon";

export default function Page({searchParams}
:{
  searchParams:{[key:string]:string | undefined};
}){
  const searchQuery:string|undefined = searchParams.search ?
                                       searchParams.search :
                                       undefined

  return (<>
    <LoadPokemon search={searchQuery}/>
  </>)
}
