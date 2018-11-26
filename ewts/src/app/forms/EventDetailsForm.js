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
import moment from "moment";
import { Formik, Field, Form, FieldArray } from "formik";
import Chip from "@material-ui/core/Chip";

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String!
    $description: String
    $eventDate: DateTime
    $crawlDate: DateTime
    $source: String
    $href: String
  ) {
    eventUpdater: updateEvent(
      data: {
        title: $title
        description: $description
        eventDate: $eventDate
        crawlDate: $crawlDate
        source: $source
        href: $href
      }
      where: { id: $id }
    ) {
      id
      title
      description
    }
  }
`;

const CONNECT_DESCRIPTOR = gql`
  mutation connectDescriptor($id: ID!, $tag: String) {
    connectDescriptor: updateEvent(
      where: { id: $id }
      data: { descriptors: { connect: { tag: $tag } } }
    ) {
      id
      title
      descriptors {
        id
        tag
      }
    }
  }
`;

const ADD_DESCRIPTOR = gql`
  mutation addDescriptor($tag: String!) {
    createDescriptor(data: { tag: $tag }) {
      id
      tag
    }
  }
`;

const REMOVE_DESCRIPTOR = gql`
  mutation removeDescriptor($tag: String!) {
    deleteDescriptor(where: { tag: $tag }) {
      id
      tag
    }
  }
`;

const EventDetailsForm = ({ event }) => {
  const {
    id,
    title,
    description,
    source,
    href,
    eventDate,
    crawlDate,
    descriptors
  } = event;
  return (
    <Mutation mutation={CONNECT_DESCRIPTOR}>
      {(connectDescriptor, { data }) => (
        <Mutation mutation={UPDATE_EVENT}>
          {(eventUpdater, { data }) => (
            <Formik
              initialValues={{
                title,
                description,
                source,
                href,
                eventDate:
                  moment(eventDate).format("YYYY-MM-DD") ||
                  moment.format("YYYY-MM-DD"),
                crawlDate:
                  moment(crawlDate).format("YYYY-MM-DD") ||
                  moment.format("YYYY-MM-DD"),
                descriptors: descriptors.map(d => d.tag)
              }}
              onSubmit={(values, { setSubmitting }) => {
                const { descriptors } = values;
                if (descriptors.length > 0) {
                  descriptors.map(d =>
                    connectDescriptor({ variables: { id: id, tag: d } })
                  );
                }

                eventUpdater({ variables: { id, ...values } });

                setTimeout(() => {
                  setSubmitting(false);
                  alert(JSON.stringify(values, null, 2));
                }, 500);
              }}
            >
              {({
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange
              }) => {
                return (
                  <Form>
                    <div className={styles.box}>
                      <div className={styles.header}>Event Form</div>

                      <div className={styles.oneliner}>
                        <Field
                          name="title"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="title"
                              fullWidth
                              label="Title of the event"
                              type="text"
                            />
                          )}
                        />
                      </div>

                      <div className={styles.oneliner}>
                        <Field
                          name="description"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="description"
                              multiline
                              rows={8}
                              fullWidth
                              label="Description of the event"
                              type="text"
                            />
                          )}
                        />
                      </div>

                      <div className={styles.left}>
                        <Field
                          name="source"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="source"
                              fullWidth
                              label="Source of article"
                              type="text"
                            />
                          )}
                        />
                      </div>

                      <div className={styles.right}>
                        <Field
                          name="href"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="href"
                              fullWidth
                              label="Hyperlink of the article"
                              type="url"
                            />
                          )}
                        />
                      </div>

                      <div className={styles.left}>
                        <Field
                          name="eventDate"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="eventDate"
                              locale="en-gb"
                              fullWidth
                              label="Date of the event"
                              type="date"
                            />
                          )}
                        />
                      </div>

                      <div className={styles.right}>
                        <Field
                          name="crawlDate"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="crawlDate"
                              fullWidth
                              label="Date article was sourced"
                              type="date"
                            />
                          )}
                        />
                      </div>

                      <div className={styles.oneliner}>
                        <FieldArray
                          name="descriptors"
                          render={arrayHelpers => (
                            <Mutation mutation={REMOVE_DESCRIPTOR}>
                              {(removeDescriptor, { data }) => (
                                <Mutation mutation={ADD_DESCRIPTOR}>
                                  {(createDescriptor, { data }) => (
                                    <ChipInput
                                      fullWidth
                                      label="Descriptors"
                                      value={values.descriptors}
                                      onAdd={e => {
                                        createDescriptor({
                                          variables: { tag: e }
                                        });
                                        arrayHelpers.push(e);
                                      }}
                                      onDelete={e => {
                                        removeDescriptor({
                                          variables: { tag: e }
                                        });
                                        arrayHelpers.remove(
                                          values.descriptors.indexOf(e)
                                        );
                                      }}
                                    />
                                  )}
                                </Mutation>
                              )}
                            </Mutation>
                          )}
                        />
                      </div>

                      <div className={styles.oneliner}>
                        <button type="submit"> Update</button>
                      </div>
                    </div>{" "}
                  </Form>
                );
              }}
            </Formik>
          )}
        </Mutation>
      )}
    </Mutation>
  );
};

EventDetailsForm.propTypes = {};

export default EventDetailsForm;
