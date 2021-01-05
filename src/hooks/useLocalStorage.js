import React, { useState, useEffect } from 'react'

const useLocalStorage = (key) =>{
  const value = localStorage.getItem(key)|| null
  const [item, setItem] = useState(value)

  useEffect(() => {
    if(item === null){
      localStorage.removeItem(key)
    }else{
      localStorage.setItem(key,item)
    }
  }, [key,item])

  return [item,setItem]
}
export default useLocalStorage