import axios from 'axios'

class AuthClient {

  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/'
    })
  }

  getImages() {
    return this.request({ method: "GET", url: '/api/images/'})
      .then(response => {
        if(response.data.success) {
          return response.data.images
        }
      })
  }

}

export default new AuthClient()