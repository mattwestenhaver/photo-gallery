import React, { Component } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/mw.png'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import Gallery from './components/Gallery.jsx'
import Signup from './components/users/Signup.jsx'
import Login from './components/users/Login.jsx'
import Logout from './components/users/Logout.jsx'
import auth from './auth.js'

class App extends Component {

  state = {
    currentUser: auth.getCurrentUser()
  }

  setCurrentUser() {
    this.setState({
      currentUser: auth.getCurrentUser()
    })
  }

  logOut() {
    auth.clearToken()
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.currentUser
            ? <div className="logout-container">
                <NavLink to='/logout'>
                  <h4>Logout</h4>
                </NavLink>
              </div>
            : null
          }
          <div>
            <NavLink to='/'><img className="logo" src={logo} alt="Matthew Westenhaver's Logo" /></NavLink>
          </div>
          {this.state.currentUser
            ? <div className="user-header">
                <h3>Welcome, {this.state.currentUser.firstName}!</h3>
              </div>
            : null
          }
          <Route exact path='/' component={Gallery} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/login' render={() => (
            <Login onLogin={this.setCurrentUser.bind(this)} />
          )} />          
          <Route path='/logout' render={() => (
            <Logout onLogout={this.logOut.bind(this)} />
          )} />
        </div>
      </Router>
    );
  }

}

export default App;
