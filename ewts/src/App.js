import React, { Component } from "react";
import "./App.css";
import EventForm from "./app/forms/EventForm";
import EventDetails from "./app/views/EventDetails";
import Events from "./app/views/Events";
import client from "./data/apolloClient";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <ApolloProvider client={client}>
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">Early Warning Threat System</h1>
              </header>
              <div className="App-intro">
                <span>
                  <Link to="/events">
                    <button>Events list</button>
                  </Link>
                </span>
                &nbsp;&nbsp;
                <Route path="/events" component={Events} />
                <Route path="/eventdetails/:id" component={EventDetails} />
              </div>
            </div>
          </ApolloProvider>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
