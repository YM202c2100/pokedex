"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  const router = useRouter()

  const submitQuery = ()=>{
    if(text === ""){
      router.push("./")
    }else{
      router.push(`./?search=${text}`)
    }
  }
  useEffect(submitQuery,[text])

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