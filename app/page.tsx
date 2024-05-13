import LoadPokemon from "./components/loadPokemon";

export default function Page({searchParams}
:{
  searchParams:{[key:string]:string | string[] | undefined};
}){
  
  return (<>
    <LoadPokemon/>
  </>)
}
