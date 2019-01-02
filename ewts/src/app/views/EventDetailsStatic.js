import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import NavbarBottom from "./NavbarBottom";
import styles from "./EventDetailsStatic.module.css";
import classNames from "classnames";
import { format, parse } from "date-fns";
import { Formik, Form } from "formik";
import Input from "@material-ui/core/Input";
import DescriptorTagInput from "../components/DescriptorTagInput";

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
          Source: <strong>source</strong>
        </div>
        <div className={styles.right}>hyperlink: </div>
        <div className={styles.left}>
          Crawldate:
          {"  "}
          <strong>{format(parse(event.crawlDate), "do MMMM YYYY")}</strong>
        </div>
        <div className={styles.descriptors}>
          {" "}
          <h3>Descriptors: </h3>
          <Formik
            initialValues={{ tag: "" }}
            validate={values => {
              let errors = {};
              if (!values.tag) {
                errors.tag = "A tag is required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <DescriptorTagInput />

                  {errors.tag && touched.tag}
                </Form>
              );
            }}
          </Formik>
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
