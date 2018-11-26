import React, { Component } from "react";
import "./App.css";

import EventDetails from "./app/views/EventDetails";
import Events from "./app/views/Events";
import client from "./data/apolloClient";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import EventDetailsForm from "./app/forms/EventDetailsForm";
import EventDescriptorsForm from "./app/forms/EventDescriptorsForm";

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
              <div align="left">
                <span>
                  <Link to="/events">
                    <button>Events list</button>
                  </Link>
                  <Link to="/eventDescriptorsForm">
                    <button>Event descriptors</button>
                  </Link>
                  <hr />
                </span>
                &nbsp;&nbsp;
              </div>
              <div className="body">
                <Route path="/events" component={Events} />
                <Route path="/eventdetails/:id" component={EventDetails} />
                <Route path="/newEvent" component={EventDetailsForm} />
                <Route
                  path="/eventDescriptorsForm"
                  component={EventDescriptorsForm}
                />
              </div>
            </div>
          </ApolloProvider>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
