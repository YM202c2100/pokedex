"use client"

import { useState } from "react"

const Search:React.FC = ()=>{
  const [text, setText] = useState("")
  return(<>
    <form action="" onSubmit={(e)=>{e.preventDefault();console.log(`clicked and sent value: ${text}`)}}>
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