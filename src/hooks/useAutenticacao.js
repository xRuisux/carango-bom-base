import { createContext, useContext, useState } from "react";

const estadoInicial = {
  token: '',
  salvaToken: (token) => { },
  usuarioEstaLogado: () => false,
}

const Context = createContext({ token: '' })

export function AutenticacaoProvider({ children }) {

  const [token, setToken] = useState('')

  function usuarioEstaLogado() {
    return !!token
  }

  function salvaToken(token) {
    localStorage.setItem('token', token)
    console.log('salvaToken', { token })
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