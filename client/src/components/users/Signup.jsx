import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import auth from '../../auth.js'
import { Redirect, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: false,
      redirect: false
    }
  }

  handleFormSubmit() {
    this.setState({ loading: true })
    if(this.refs.password.value === this.refs.passwordConfirm.value) {
      const userData = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
      }
      auth.signup(userData).then(response => {
        if(response) {
          this.setState({ redirect: true })
        } else {
          toast.error('Unable to create your account. Maybe try another email?', {
            position: toast.POSITION.TOP_CENTER
          })
          console.log('Unable to create account')
          this.setState({ loading: false })
        }
      })
    } else {
      this.setState({ loading: false })
      toast.error('Your passwords do not match. Please try again.', {
        position: toast.POSITION.TOP_CENTER
      }, 3000)
    }
  }

  render() {
    return (
      this.state.redirect
        ? <Redirect to='/login' />
        : <div className="submit-form">
            <h1>Create an Account</h1>
            <Form onSubmit={this.handleFormSubmit.bind(this)}>

              <Form.Field>
                <input type='text' ref='firstName' placeholder='First Name' />
              </Form.Field>

              <Form.Field>
                <input type='text' ref='lastName' placeholder='Last Name' />
              </Form.Field>

              <Form.Field>
                <input type='text' ref='email' placeholder='Email Address' />
              </Form.Field>

              <Form.Field>
                <input type='password' ref='password' placeholder='Password' />
              </Form.Field>

              <Form.Field>
                <input type='password' ref='passwordConfirm' placeholder='Confirm Password' />
              </Form.Field>

              {this.state.loading
                ? <Form.Field>
                    <Button color="black" loading disabled primary size='big'>Loading</Button>
                  </Form.Field>
                : <Form.Field>
                    <Button color="black" size='big'>Create Account</Button>
                  </Form.Field>
              }

              <h4>Already have an account? Login <NavLink to="/login">here</NavLink></h4>

            </Form>
            <ToastContainer />
          </div>
    )
  }
}

export default Signup