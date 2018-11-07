import React from "react";
import NavbarBottom from "../views/NavbarBottom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const EVENTMUTATION = gql`
  mutation updateEvent($id: ID!, $title: String, $description: String) {
    updateEvent(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const EventDetailsForm = ({ event, onEdit }) => {
  return (
    <div>
      <form onSubmit={onEdit}>
        <label name="Title">Title</label>
        <input
          htmlFor="title"
          type="text"
          value={event.title}
          placeholder="Enter a title here"
        />
        <label name="description">Description</label>
        <textarea
          htmlFor="description"
          rows={4}
          value={event.description}
          placeholder="Enter a description here"
        />
      </form>
      <Mutation mutation={EVENTMUTATION} variables={{ ...event }}>
        {updateEvent => {
          return <NavbarBottom saveButton onEdit={updateEvent} />;
        }}
      </Mutation>
    </div>
  );
};
export default EventDetailsForm;
