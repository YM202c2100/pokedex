import LoadPokemon from "./components/loadPokemon";
import Search from "./components/search";

export default async function Page({searchParams}
:{
  searchParams:{[key:string]:string};
}){
  return (
    <div className="container flex flex-col items-center mx-auto">
      <header className="bg-indigo-50 w-screen fixed py-5 flex flex-col justify-center">
        <div className="text-3xl mb-2 mx-auto md:absolute md:top-5 md:ml-3">ポケモン図鑑</div>
        <Search/>
      </header>
      <LoadPokemon 
        search={searchParams.search} 
      />
    </div>
  )
}
