import React, { useState } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import { Column, Table, AutoSizer } from "react-virtualized";
import { Formik } from "formik";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Delete from "@material-ui/icons/DeleteOutlined";

const SCENARIOS_QUERY = gql`
  query Scenarios {
    scenarios {
      id
      title
    }
  }
`;

const ADD_SCENARIO = gql`
  mutation createScenario($title: String!, $description: String!) {
    createScenario(data: { title: $title, description: $description }) {
      id
      title
    }
  }
`;

const DELETE_SCENARIO = gql`
  mutation deleteScenario($id: ID!) {
    deleteScenario(where: { id: $id }) {
      id
    }
  }
`;

const UPDATE_SCENARIO = gql`
  mutation updateScenario($id: ID!, $title: String!) {
    updateScenario(data: { title: $title }, where: { id: $id }) {
      title
      id
    }
  }
`;

const EditScenario = ({ id, title, updateEdit }) => {
  return (
    <div>
      <Mutation mutation={UPDATE_SCENARIO}>
        {(updateScenario, { data }) => {
          return (
            <Formik initialValues={{ id, title }}>
              {({
                values,
                errors,
                isSubmitting,
                touched,
                handleSubmit,
                handleChange
              }) => {
                return (
                  <Input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    onBlur={e => {
                      updateScenario({
                        variables: {
                          id: values.id,
                          title: values.title
                        }
                      });
                      updateEdit(false);
                    }}
                    value={values.title}
                  />
                );
              }}
            </Formik>
          );
        }}
      </Mutation>
      <Mutation
        mutation={DELETE_SCENARIO}
        update={(cache, { data: { deleteScenario } }) => {
          const { scenarios } = cache.readQuery({ query: SCENARIOS_QUERY });
          cache.writeQuery({
            query: SCENARIOS_QUERY,
            data: {
              scenarios: scenarios.filter(scenario => scenario.id !== id)
            }
          });
        }}
      >
        {deleteScenario => {
          return (
            <Delete
              onClick={e => {
                deleteScenario({ variables: { id: id } });
                updateEdit(false);
              }}
            />
          );
        }}
      </Mutation>
    </div>
  );
};

const ScenarioRow = ({ id, title }) => {
  const [editing, updateEdit] = useState(false);

  if (!editing) {
    return (
      <StyledScenarioRow
        onClick={e => {
          updateEdit(!editing);
        }}
      >
        {title}
      </StyledScenarioRow>
    );
  } else {
    return (
      <EditScenario
        id={id}
        title={title}
        onClick={e => updateEdit(!editing)}
        updateEdit={updateEdit}
      />
    );
  }
};
const StyledScenarioRow = styled.div`
  font-size: 1.2em;
  background-color: #e9ece5;
  &:hover {
    background-color: #b3c2bf;
  }
`;

const Scenarios = () => {
  return (
    <Query query={SCENARIOS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading data.......";
        if (error) return `Error: ${error.message}`;

        return (
          <React.Fragment>
            <Paper className="Paper">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div>
                    <Table
                      width={width}
                      height={400}
                      headerHeight={40}
                      rowHeight={30}
                      rowCount={data.scenarios.length}
                      rowGetter={({ index }) => data.scenarios[index]}
                      headerClassName="headers"
                    >
                      <Column
                        label="Scenarios"
                        dataKey="scenarios"
                        width={800}
                        className="rows"
                        cellRenderer={({ rowData }) => {
                          return (
                            <ScenarioRow
                              id={rowData.id}
                              title={rowData.title}
                            />
                          );
                        }}
                      />
                    </Table>
                  </div>
                )}
              </AutoSizer>
            </Paper>
            <Mutation
              mutation={ADD_SCENARIO}
              ignoreResults
              update={(cache, { data: { createScenario } }) => {
                const { scenarios } = cache.readQuery({
                  query: SCENARIOS_QUERY
                });
                cache.writeQuery({
                  query: SCENARIOS_QUERY,
                  data: { scenarios: scenarios.concat([createScenario]) }
                });
              }}
            >
              {createScenario => {
                return (
                  <Formik
                    initialValues={{ title: "", description: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                      createScenario({
                        variables: {
                          title: values.title,
                          description: values.description
                        }
                      });
                      values.title = "";
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      errors,
                      isSubmitting,
                      touched,
                      handleSubmit,
                      handleChange
                    }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <Input
                            type="text"
                            label="Title"
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            disabled={isSubmitting}
                          />
                          <Input
                            type="text"
                            label="Description"
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            disabled={isSubmitting}
                          />
                          <Button type="submit">Add</Button>
                        </form>
                      );
                    }}
                  </Formik>
                );
              }}
            </Mutation>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Scenarios;
