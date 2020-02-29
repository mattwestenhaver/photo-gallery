import React from 'react';
import './App.css';
import logo from './images/mw.png'

import Gallery from './components/Gallery.jsx'

function App() {
  return (
    <div className="App">
      <img className="logo" src={logo} alt="Matthew Westenhaver's Logo" />
      <Gallery /> 
    </div>
  );
}

export default App;
