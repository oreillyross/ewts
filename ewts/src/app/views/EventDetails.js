import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Formik, Form, Field, ErrorMessage } from "formik";

const EVENTQUERY = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      description
      source
      href
      unread
    }
  }
`;

const EventDetails = ({ match }) => (
  <Query query={EVENTQUERY} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return (
        <div>
          <Formik
            initialValues={{
              title: data.getEvent.title,
              description: data.getEvent.description
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="title" />
                <ErrorMessage name="title" component="div" />
                <Field type="text" name="description" />
                <ErrorMessage name="description" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      );
    }}
  </Query>
);

export default EventDetails;
