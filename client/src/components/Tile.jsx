import React from 'react'
import { Modal } from 'semantic-ui-react'

class Tile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {

    const { open, dimmer } = this.state

    return (
      <div className="image-tile">
        <img src={this.props.image} alt={"image of " + this.props.image} onClick={this.show('blurring')} />
        <Modal 
          size='small' 
          basic
          closeIcon
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          >
          <Modal.Content image>
            <img className="modal-image" src={this.props.image} alt={"image of " + this.props.image} />
          </Modal.Content>
        </Modal>
      </div>
    )
  }

}

export default Tile