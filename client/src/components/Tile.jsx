import React from 'react'

class Tile extends React.Component {

  render() {
    return (
      <div className="image-tile">
        <img src={this.props.image} alt={"image of " + this.props.image} />
      </div>
    )
  }

}

export default Tile