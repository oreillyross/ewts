import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import NavbarBottom from "./NavbarBottom";
import styles from "./EventDetailsStatic.module.css";
import classNames from "classnames";
import moment from "moment";

const EventDetailsStatic = ({ event, onEdit }) => {
  return (
    <div>
      <Paper className={styles.box}>
        <h2 className={styles.oneliner}> {event.title}</h2>
        <div className={classNames(styles.oneliner, styles.description)}>
          {" "}
          {event.description}
        </div>
        <div className={styles.left}>
          Source: <strong>{event.source}</strong>
        </div>
        <div className={styles.right}>
          hyperlink:{" "}
          <a target="_blank" rel="noopener noreferrer" href={event.href}>
            link
          </a>
        </div>
        <div className={styles.left}>
          date of occurrence:{" "}
          <strong>{moment(event.eventDate).format("LL")}</strong>
        </div>
        <div className={styles.descriptors}>
          {" "}
          <h3>Descriptors: </h3>
          {event.descriptors.map(d => (
            <Chip key={d.id} label={d.tag} />
          ))}
        </div>
      </Paper>
      <NavbarBottom editButton onEdit={onEdit} />
    </div>
  );
};

EventDetailsStatic.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventDetailsStatic;
