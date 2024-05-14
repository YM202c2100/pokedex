"use client"

import { useState } from "react"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  return(<>
    <input type="text"
           onChange={(e)=>setText(e.target.value)} 
           value={text}
           className="border"
    />
    <button onClick={()=>console.log(`clicked and sent value:${text}`)}>検索</button>
    </>)
}

export default Search