import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

export const MyContext = createContext()

export const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { booksList: '' })

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => {
  return useContext(MyContext)
}
