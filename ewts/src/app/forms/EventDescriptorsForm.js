import React from "react";
import Paper from "@material-ui/core/Paper";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const DESCRIPTORS = gql`
  query descriptors {
    descriptors {
      id
      tag
    }
  }
`;

const EventDescriptorsForm = () => {
  return (
    <Paper className="Paper">
      <Query query={DESCRIPTORS}>
        {({ loading, error, data }) => {
          if (loading) return "loading...";
          if (error) throw new Error(error);
          return data.descriptors.map(d => {
            return <span key={d.id}>" "{d.tag}" "</span>;
          });
        }}
      </Query>
    </Paper>
  );
};

export default EventDescriptorsForm;
