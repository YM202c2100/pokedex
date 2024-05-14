"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  const [query] = useDebounce(text, 3000)
  const router = useRouter()

  const submitQuery = ()=>{
    if(query === ""){
      router.push("./")
    }else{
      router.push(`./?search=${query}`)
    }
  }
  useEffect(submitQuery,[query])

  return(
    <form onSubmit={(e)=>{e.preventDefault()}}>
      <input type="text"
           onChange={(e)=>setText(e.target.value)} 
           value={text}
           className="border"
      />
    </form>
  )
}

export default Search