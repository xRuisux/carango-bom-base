const token = localStorage.getItem('token')
const authorization = `Bearer ${token}`

export const api = {
  post: async (path, data) => {
    const resp = await (fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorization
      },
      body: JSON.stringify(data)
    }))

    return resp.json()
  },
  get: async (path) => {
    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, {
      headers: {
        Authorization: authorization
      }
    })

    return resp.json()
  }
}