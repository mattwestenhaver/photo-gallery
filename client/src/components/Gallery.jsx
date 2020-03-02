import React from 'react'
import auth from '../auth.js'
import { Pagination, Checkbox, Form, Button } from 'semantic-ui-react'
import Tile from './Tile.jsx'
import { Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

class Gallery extends React.Component {

  constructor() {
    super()
    this.state = {
      currentImages: [],
      activePage: 1,
      totalPages: 1,
      checked: false,
      width: 450,
      height: 450,
      viewFilters: false,
      redirect: false
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    if(name === 'width') {
      this.getImages(1, value, this.state.height)
    } else if (name === "height") {
      this.getImages(1, this.state.width, value)
    }
  }

  toggleFilters() {
    this.setState({
      viewFilters: !this.state.viewFilters
    })
  }

  toggle = () => this.setState((prevState) => ({ checked: !prevState.checked }))
  
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ 
      activePage: activePage,
    }, this.getImages(activePage))
  }

  getImages(page, w, h) {
    const data = {
      activePage: page,
      width: w || this.state.width,
      height: h || this.state.height
    }
    auth.getImages(data).then(response => {
      this.setState({
        totalPages: response.pages,
        currentImages: response.images,
        activePage: page
      })
    })
  }

  componentDidMount() {
    if(!auth.getCurrentUser()) {
      this.setState({ redirect: true })
      toast.error('You must be logged in to access the photo gallery.', {
        position: toast.POSITION.TOP_CENTER
      })
    } else {
      this.getImages(1)
    }
  }

  render() {

    const { width, height, activePage } = this.state

    return (
      this.state.redirect
        ? <Redirect to='/login' />
        : <div className="gallery">
            <Pagination
              activePage={activePage}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={this.state.totalPages}
              onPageChange={this.handlePaginationChange.bind(this)}
            />
            <div className="options-button">
              <Button onClick={this.toggleFilters.bind(this)}>{this.state.viewFilters ? "Hide Filters" : "View Filters"}</Button>
            </div>
            {this.state.viewFilters
              ? <div className="options">
                  <Checkbox label={this.state.checked ? "Grayscale On" : "Grayscale Off"} checked={this.state.checked} toggle onClick={this.toggle} />
                  <Form className="filtering">
                    <Form.Group inline >
                      <Form.Input
                        label={`Max. Width: ${width}`}
                        min={100}
                        max={450}
                        name='width'
                        onChange={this.handleChange}
                        step={50}
                        type='range'
                        value={width}
                      />
                      <Form.Input
                        label={`Max. Height: ${height}`}
                        min={100}
                        max={450}
                        name='height'
                        onChange={this.handleChange}
                        step={50}
                        type='range'
                        value={height}
                      />
                    </Form.Group>
                  </Form>
                </div>
              : null
            }
            <div className="images">
              {this.state.currentImages.map((i, index) => {
                return (
                  <Tile key={index} image={this.state.checked ? i + "?grayscale" : i} />
                )
              })}
            </div>
            <ToastContainer />
          </div>
    )
  }
}

export default Gallery