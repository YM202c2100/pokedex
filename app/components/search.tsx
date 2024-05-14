"use client"

import { useState } from "react"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  return(
    <input type="text"
           onChange={(e)=>setText(e.target.value)} 
           value={text}
           className="border"/>
  )
}

export default Search