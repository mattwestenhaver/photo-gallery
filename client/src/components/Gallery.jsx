import React from 'react'
import auth from '../auth.js'
import { Pagination, Checkbox } from 'semantic-ui-react'
import Tile from './Tile.jsx'

class Gallery extends React.Component {

  constructor() {
    super()
    this.state = {
      allImages: [],
      currentImages: [],
      itemsPerPage: 9,
      activePage: 1,
      totalPages: 1,
      checked: false
    }
  }

  toggle = () => this.setState((prevState) => ({ checked: !prevState.checked }))
  
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ 
      activePage: activePage,
    }, this.updateImages(activePage))
  }

  getImages() {
    auth.getImages().then(response => {
      this.setState({
        allImages: response,
        totalPages: Math.ceil(response.length / this.state.itemsPerPage),
        currentImages: response.slice(0, this.state.itemsPerPage)
      })
    })
  }

  updateImages(page) {
    var updatedImages = this.state.allImages.slice((page - 1) * this.state.itemsPerPage, ((page - 1) * this.state.itemsPerPage) + this.state.itemsPerPage)
    this.setState({
      currentImages: updatedImages
    })
  }

  componentDidMount() {
    this.getImages()
  }

  render() {
    return (
      <div className="gallery">
        <Pagination
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={this.state.totalPages}
          onPageChange={this.handlePaginationChange.bind(this)}
        />
        <div className="images">
          {this.state.currentImages.map((i, index) => {
            return (
              <Tile key={index} image={this.state.checked ? i + "?grayscale" : i} />
            )
          })}
        </div>
        <div>
          <Checkbox toggle onClick={this.toggle} />
        </div>
      </div>
    )
  }
}

export default Gallery