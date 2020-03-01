import axios from 'axios'

class AuthClient {

  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/'
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

}

export default new AuthClient()