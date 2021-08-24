import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  token: '',
  isUserLoggedIn: () => false,
}

const Context = createContext(initialState)

export function AuthProvider({ children }) {

  const [token, setToken] = useState('')
  
  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    if(storageToken) {
      setToken(storageToken)
    }
  }, [token])

  function isUserLoggedIn() {
    return !!token || !!localStorage.getItem('token')
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