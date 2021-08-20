import { createContext, useContext, useState } from "react";

const estadoInicial = {
  token: '',
  salvaToken: () => { },
  usuarioEstaLogado: () => false,
}

const Context = createContext(estadoInicial)

export function AutenticacaoProvider({ children }) {

  const [token, setToken] = useState('')

  function usuarioEstaLogado() {
    return !!token
  }

  function salvaToken(token) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  const value = {
    salvaToken,
    token,
    usuarioEstaLogado
  }

  return <Context.Provider
    value={value}
  >
    {children}
  </Context.Provider>
}

export const useAutenticacao = () => useContext(Context)