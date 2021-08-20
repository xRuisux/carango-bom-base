const LoginService = {
  login(credenciais) {
    return fetch('http://localhost:8080/autenticacao', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciais)
    }).then(resp => resp.json())
      .then(dado => dado)
      .catch(_ => ({ token: undefined }))
  }
}

export default LoginService