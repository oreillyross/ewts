import React, { Component } from "react";
import "./App.css";

import EventDetails from "./app/views/EventDetails";
import Events from "./app/views/Events";
import client from "./data/apolloClient";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import EventDetailsForm from "./app/forms/EventDetailsForm";
import EventDescriptorsForm from "./app/forms/EventDescriptorsForm";
import Indicators from "./app/views/Indicators";
import Scenarios from "./app/views/Scenarios";
import Keywords from "./app/views/Keywords";
import Descriptors from "./app/views/Descriptors";

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
                  <Link to="/keywords">
                    <button>Keywords</button>
                  </Link>
                  <Link to="/descriptors">
                    <button>Descriptors</button>
                  </Link>
                  <Link to="/scenarios">
                    <button>Scenarios</button>
                  </Link>
                  <Link to="/indicators">
                    <button>Indicators</button>
                  </Link>
                  <Link to="/events">
                    <button>Events list</button>
                  </Link>
                  <Link to="/newEvent">
                    <button>New Event</button>
                  </Link>
                  <hr />
                </span>
                &nbsp;&nbsp;
              </div>
              <div className="body">
                <Route path="/events" component={Events} />
                <Route path="/scenarios" component={Scenarios} />
                <Route path="/indicators" component={Indicators} />
                <Route path="/keywords" component={Keywords} />
                <Route path="/descriptors" component={Descriptors} />
                <Route path="/eventdetails/:id" component={EventDetails} />
                <Route path="/newEvent" component={EventDetailsForm} />
              </div>
            </div>
          </ApolloProvider>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
