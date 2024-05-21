"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  const [query] = useDebounce(text, 750)
  const router = useRouter()

  useEffect(()=>{
    if(query){
      router.replace(`/?search=${query}`)
    }
  },[query])

  return(
    <input type="text"
           onChange={(e)=>setText(e.target.value)} 
           value={text}
           className="border"
    />
  )
}

export default Search