import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@material-ui/core/Input";

const Title = styled.div`
  margin: 3px;
  color: #585858;
  border: 1px solid grey;
  padding: 4px;
  padding-left: 20px;
  text-align: left;
  font-family: "Roboto Condensed", sans-serif;
`;

const StyledForm = styled.form`
  display: grid;
  border: 1px solid black;
`;

class EventForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Title> Create a new event </Title>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required")
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <StyledForm onSubmit={handleSubmit}>
                <Input
                  id="title"
                  label="Title"
                  placeholder="Enter the title of event"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title &&
                  touched.title && (
                    <div className="input-feedback">{errors.title}</div>
                  )}
              </StyledForm>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}
export default EventForm;
