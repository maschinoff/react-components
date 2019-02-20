import React, { Component } from 'react';
import 'typeface-roboto';
import './App.css';

import HebewDateSelector from './components/HebrewDateSelector';

class App extends Component {
  render() {
    return (
      <div className="App">
          <HebewDateSelector/>
      </div>
    );
  }
}

export default App;
