import React, { useState } from "react";
import NavbarBottom from "../views/NavbarBottom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormGroup from "@material-ui/core/FormGroup";
import styles from "./EventDetailsForm.module.css";
import ChipInput from "material-ui-chip-input";

const EVENTMUTATION = gql`
  mutation updateEvent(
    $id: ID!
    $title: String
    $description: String
    $crawlDate: Float
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      crawlDate: $crawlDate
    ) {
      id
      title
      description
    }
  }
`;

const EventDetailsForm = ({ event }) => {
  console.log(styles.box);
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [source, setSource] = useState(event.source || "");
  const [href, setHref] = useState(event.href || "");
  const [crawlDate, setCrawlDate] = useState(event.crawlDate || Date.now());
  const [eventDate, setEventDate] = useState(event.eventDate || Date.now());

  return (
    <div className={styles.box}>
      <div className={styles.header}>Event Form</div>

      <div className={styles.oneliner}>
        <TextField
          id="title"
          name="title"
          onChange={e => setTitle(e.target.value)}
          value={title}
          fullWidth
          label="Title of the event"
          type="text"
        />
      </div>

      <div className={styles.oneliner}>
        <TextField
          id="description"
          name="description"
          onChange={e => setDescription(e.target.value)}
          value={description}
          multiline
          rows={8}
          fullWidth
          label="Description of the event"
          type="text"
        />
      </div>

      <div className={styles.left}>
        <TextField
          id="source"
          name="source"
          onChange={e => setSource(e.target.value)}
          value={source}
          fullWidth
          label="Source of article"
          type="text"
        />
      </div>

      <div className={styles.right}>
        <TextField
          id="href"
          name="href"
          onChange={e => setHref(e.target.value)}
          value={href}
          fullWidth
          label="Hyperlink of the article"
          type="url"
        />
      </div>

      <div className={styles.left}>
        <TextField
          id="eventDate"
          name="eventDate"
          onChange={e => setEventDate(e.target.value)}
          value={eventDate}
          fullWidth
          label="Date of the event"
          type="date"
        />
      </div>

      <div className={styles.right}>
        <TextField
          id="crawlDate"
          name="crawlDate"
          onChange={e => setCrawlDate(e.target.value)}
          value={crawlDate}
          fullWidth
          label="Date article was sourced"
          type="date"
        />
      </div>

      <div className={styles.oneliner}>
        <ChipInput
          fullWidth
          defaultValue={["Hezbollah", "Israel"]}
          onChange={chips => console.log(chips)}
        />
      </div>

      <div className={styles.oneliner}>
        <ChipInput
          fullWidth
          defaultValue={["Increased risk of war", "Government formation"]}
          onChange={chips => console.log(chips)}
        />
      </div>

      <div className={styles.oneliner}>
        <button> Update</button>
      </div>
    </div>
  );
};

EventDetailsForm.propTypes = {};

export default EventDetailsForm;
