import React, { createContext, useContext, useReducer, type ReactNode } from 'react'
import reducer, { type State, type Action } from './reducer'

interface MyProviderProps {
  children: ReactNode
}

interface MyContextValue {
  state: State
  dispatch: React.Dispatch<Action>
}

export const MyContext = createContext<MyContextValue | undefined>(undefined)

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { booksList: '' })

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
