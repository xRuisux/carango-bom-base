import { createContext, useContext, useState } from "react";

const initialState = {
  token: '',
  isUserLoggedIn: () => false,
}

const Context = createContext(initialState)

export function AutenticacaoProvider({ children }) {

  const [token, setToken] = useState('')

  function isUserLoggedIn() {
    return !!token
  }

  function saveToken(userToken) {
    localStorage.setItem('token', userToken)
    setToken(userToken)
  }

  const value = {
    saveToken,
    token,
    isUserLoggedIn
  }

  return <Context.Provider
    value={value}
  >
    {children}
  </Context.Provider>
}

export const useAuth = () => useContext(Context)