import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import NavbarBottom from "./NavbarBottom";
const EventDetailsStatic = ({ event, onEdit }) => {
  return (
    <div>
      <Paper>
        <h2> {event.title}</h2>
        <div> {event.description}</div>
      </Paper>
      <NavbarBottom editButton onEdit={onEdit} />
    </div>
  );
};

EventDetailsStatic.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventDetailsStatic;
