import React, { useContext } from 'react'
import { TitleContext } from '../context/TitleProvider'

const TitleChanger = () => {
    const { title, setTitle, resetTitle } = useContext(TitleContext)
  return (
    <div>
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={resetTitle}>Reset</button>
    </div>
  )
}

export default TitleChanger
