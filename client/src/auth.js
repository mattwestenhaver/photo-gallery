import axios from 'axios'
import jwtDecode from 'jwt-decode'

class AuthClient {

  constructor() {
    this.request = axios.create({
      baseURL: 'https://mw-photo-gallery.herokuapp.com/',
      // baseURL: 'http://localhost:3001/',
      headers: {
        common: {
          token: this.getToken()
        }
      }
    })
  }

  getImages(filter) {
    return this.request({ method: "GET", url: `/api/${filter.activePage}/${filter.width}/${filter.height}/` })
      .then(response => {
        if(response.data.success) {
          return response.data
        }
      })
  }

  signup(userInfo) {
    return this.request({method: 'Post', url: "/users", data: userInfo})
      .then(response => response.data.success)
  }

  login(credentials) {
    return this.request({method: 'POST', url: '/users/authenticate', data: credentials})
      .then((response) => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token)
        } else {
          return false
        }
      })
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token) {
    localStorage.setItem('token', token)
    this.request.defaults.headers.common.token = token
    return token
  }

  clearToken() {
    localStorage.removeItem('token')
    delete this.request.defaults.headers.common.token
  }

  getCurrentUser() {
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }

}

export default new AuthClient()