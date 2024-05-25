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
    <div className="fixed flex justify-center w-screen py-5 bg-orange-100">
      <div>検索：</div>
      <input type="text"
             onChange={(e)=>setText(e.target.value)} 
             value={text}
             className="border-2 rounded-md"
      />
    </div>
  )
}

export default Search