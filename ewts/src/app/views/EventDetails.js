import React, { useState } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EventDetailsStatic from "./EventDetailsStatic";
import EventDetailsForm from "../forms/EventDetailsForm";
import withStyles from "@material-ui/core/styles/withStyles";

const EVENTQUERY = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      description
      crawlDate
      source
      href
      unread
      tags
      indicators
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
  const [editing, setEditing] = useState(true);
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
                <EventDetailsStatic event={data.getEvent} />{" "}
              </div>
            );
          } else {
            return (
              <div>
                <EventDetailsForm event={data.getEvent} />
              </div>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(EventDetails);
