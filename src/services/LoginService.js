import { api } from "../api"

const LoginService = {
  login(credentials) {
    return api.post('auth', credentials).catch(_ => ({ token: undefined }))
  }
}

export default LoginService