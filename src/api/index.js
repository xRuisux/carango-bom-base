const token = localStorage.getItem('token')
const authorization = `Bearer ${token}`
export const baseUrl = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://localhost:8080'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  Authorization: authorization
}

export const api = {
  post: async (path, data) => {
    const resp = await (fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })).catch(err => err)

    return { data: await resp.json()}
  },
  
  get: async (path) => {
    try {
       const resp = await fetch(`${baseUrl}/${path}`, { headers })
       if(resp.status !== 200) {
         return { error: 'Erro ao buscar dados' }
       }
       return { data: await resp.json() }
     } catch(err) {
       return err
     }
  },

  put: async (path, data) => {
    const resp = await fetch(`${baseUrl}/${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    }).catch(err => err)

    return { data: await resp.json()}
  },

  delete: async (path) => {
    const resp = await fetch(`${baseUrl}/${path}`, {
      method: 'DELETE',
      headers,
    }).catch(err => err)

    return { data: await resp.json()}
  }
}