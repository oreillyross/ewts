import React, { Component } from "react";
import "./App.css";
import EventForm from "./app/forms/EventForm";
import EventDetails from "./app/views/EventDetails";
import Events from "./app/views/Events";
import client from "./data/apolloClient";
import { ApolloProvider } from "react-apollo";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Early Warning Threat System</h1>
            </header>
            <div className="App-intro">
              <Events />
            </div>
          </div>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default App;
