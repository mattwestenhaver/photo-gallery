import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import auth from '../../auth.js'
import { Redirect, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      redirect: false
    }
  }

  handleFormSubmit() {
    this.setState({ loading: true })
    const userData = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    auth.login(userData).then(response => {
      if(response) {
        this.props.onLogin()
        this.setState({ redirect: true })
      } else {
        console.log('Invalid user credentials')
        toast.error('We do not recognize that email/password combination. Please try again.', {
          position: toast.POSITION.TOP_CENTER
        })
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      this.state.redirect
        ? <Redirect to='/' />
        : <div className="submit-form">
            <h1>Login</h1>
            <Form onSubmit={this.handleFormSubmit.bind(this)}>

            <Form.Field>
              <input type='text' ref='email' placeholder='Email Address' />
            </Form.Field>

            <Form.Field>
              <input type='password' ref='password' placeholder='Password' />
            </Form.Field>

            {this.state.loading
              ? <Form.Field>
                  <Button color="black" loading disabled primary size='big'>Loading</Button>
                </Form.Field>
              : <Form.Field>
                  <Button color="black" size='big'>Login</Button>
                </Form.Field>
            }

            <h4>Don't already have an account? Create one <NavLink to="/signup">here</NavLink></h4>

            </Form>
            <ToastContainer />
          </div>
    )
  }
}

export default Login