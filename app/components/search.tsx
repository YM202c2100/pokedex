"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useSearchParams } from "next/navigation"

const Search:React.FC = ()=>{
  const searchParams = useSearchParams().get("search")
  const [text, setText] = useState(searchParams ? searchParams : "")
  const [query] = useDebounce(text, 750)
  const router = useRouter()

  useEffect(()=>{
    if(query){
      router.replace(`/?search=${query}`)
    }
  },[query])

  const clickHandler = ()=>{
    router.push("/")
    setText("")
    router.refresh()
  }

  return(
    <div className="flex justify-center items-center">
      <button className="bg-orange-200 p-2 rounded-2xl mr-3"
              onClick={clickHandler}>一覧表示</button>
      <div>検索：</div>
      <input type="text"
             onChange={(e)=>setText(e.target.value)} 
             value={text}
             className="border-2 rounded-md w-28"
      />
    </div>
  )
}

export default Search