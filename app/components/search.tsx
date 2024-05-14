"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  const [query] = useDebounce(text, 750)
  const router = useRouter()

  const submitQuery = ()=>{
    if(query === ""){
      router.push("./")
    }else{
      router.push(`./?search=${query}`)
    }
  }
  useEffect(submitQuery,[query])

  return(<>
    <form onSubmit={(e)=>{e.preventDefault();console.log(`clicked and sent value: ${text}`)}}>
      <input type="text"
           onChange={(e)=>setText(e.target.value)} 
           value={text}
           className="border"
      />
      <button>検索</button>
    </form>
    
    </>)
}

export default Search