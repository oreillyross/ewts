import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import EventDetailsStatic from "./EventDetailsStatic";
import EventDetailsForm from "../forms/EventDetailsForm";
import withStyles from "@material-ui/core/styles/withStyles";

const EVENTQUERY = gql`
  query event($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      source
      description
      crawlDate
      category
    }
  }
`;

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit *
      1.55}px ${theme.spacing.unit * 1.55}px`
  },
  container: {}
});

const EventDetails = ({ match, classes, history }) => {
  const [editing, setEditing] = useState(false);
  const id = match.params.id;

  const onEdit = () => {
    if (!editing) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  return (
    <div>
      <Query query={EVENTQUERY} variables={{ id: id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading.....";
          if (!editing) {
            return (
              <div>
                {" "}
                {console.table(data.event)}
                <EventDetailsStatic event={data.event} />
              </div>
            );
          } else {
            return (
              <div>
                <EventDetailsForm event={data.event} />
              </div>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(EventDetails);
