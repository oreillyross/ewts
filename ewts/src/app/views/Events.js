import React from "react";
import EventTable from "./EventTable";

class Events extends React.Component {
  constructor() {
    super();
    this.state = { sources: [] };
  }

  componentDidMount() {
    fetch("https://pewts-server-oreillyross.c9users.io/roo", { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState((prevState, props) => ({ sources: data }));
      });
  }

  render() {
    return (
      <div>
        {" "}
        <h1> Events </h1>
        <EventTable sources={this.state.sources} />
      </div>
    );
  }
}

export default Events;
