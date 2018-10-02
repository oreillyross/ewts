import React from "react";

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
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        {" "}
        Events go here
        {this.state.sources}
      </div>
    );
  }
}

export default Events;
