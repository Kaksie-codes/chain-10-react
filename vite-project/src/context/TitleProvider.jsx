import React, { createContext, useState } from 'react'

export const TitleContext = createContext();


const TitleProvider = ({children}) => {
  const [title, setTitle] = useState('NFT');

  const resetTitle = () => setTitle('NFT');

  const initialState = {
    title,
    setTitle,
    resetTitle
  }

  return (
    <TitleContext.Provider value={initialState}>
      {children}
    </TitleContext.Provider>
  )
}

export default TitleProvider
