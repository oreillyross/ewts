import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventForm from './app/forms/EventForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Early Warning Threat System</h1>
        </header>
        <p className="App-intro">
          <EventForm />
        </p>
      </div>
    );
  }
}

export default App;
