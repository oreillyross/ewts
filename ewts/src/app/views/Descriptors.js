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

const DESCRIPTORS_QUERY = gql`
  query Descriptors {
    descriptors {
      id
      tag
    }
  }
`;

const ADD_DESCRIPTOR = gql`
  mutation createDescriptor($tag: String!) {
    createDescriptor(data: { tag: $tag }) {
      id
      tag
    }
  }
`;

const DELETE_DESCRIPTOR = gql`
  mutation deleteDescriptor($id: ID!) {
    deleteDescriptor(where: { id: $id }) {
      id
    }
  }
`;

const UPDATE_DESCRIPTOR = gql`
  mutation updateDescriptor($id: ID!, $tag: String!) {
    updateDescriptor(data: { tag: $tag }, where: { id: $id }) {
      tag
      id
    }
  }
`;

const EditDescriptor = ({ id, tag, updateEdit }) => {
  return (
    <div>
      <Mutation mutation={UPDATE_DESCRIPTOR}>
        {(updateDescriptor, { data }) => {
          return (
            <Formik initialValues={{ id, tag }}>
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
                    name="tag"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    onBlur={e => {
                      updateDescriptor({
                        variables: {
                          id: values.id,
                          tag: values.tag
                        }
                      });
                      updateEdit(false);
                    }}
                    value={values.tag}
                  />
                );
              }}
            </Formik>
          );
        }}
      </Mutation>
      <Mutation
        mutation={DELETE_DESCRIPTOR}
        update={(cache, { data: { deleteDescriptor } }) => {
          const { descriptors } = cache.readQuery({ query: DESCRIPTORS_QUERY });
          cache.writeQuery({
            query: DESCRIPTORS_QUERY,
            data: {
              descriptors: descriptors.filter(keyword => keyword.id !== id)
            }
          });
        }}
      >
        {deleteDescriptor => {
          return (
            <Delete
              onClick={e => {
                deleteDescriptor({ variables: { id: id } });
                updateEdit(false);
              }}
            />
          );
        }}
      </Mutation>
    </div>
  );
};

const DescriptorRow = ({ id, tag }) => {
  const [editing, updateEdit] = useState(false);

  if (!editing) {
    return (
      <StyledDescriptorRow
        onClick={e => {
          updateEdit(!editing);
        }}
      >
        {tag}
      </StyledDescriptorRow>
    );
  } else {
    return (
      <EditDescriptor
        id={id}
        tag={tag}
        onClick={e => updateEdit(!editing)}
        updateEdit={updateEdit}
      />
    );
  }
};
const StyledDescriptorRow = styled.div`
  font-size: 1.2em;
  background-color: #e9ece5;
  &:hover {
    background-color: #b3c2bf;
  }
`;

const Descriptors = () => {
  return (
    <Query query={DESCRIPTORS_QUERY}>
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
                      rowCount={data.descriptors.length}
                      rowGetter={({ index }) => data.descriptors[index]}
                      headerClassName="headers"
                    >
                      <Column
                        label="Descriptors"
                        dataKey="tags"
                        width={800}
                        className="rows"
                        cellRenderer={({ rowData }) => {
                          return (
                            <DescriptorRow id={rowData.id} tag={rowData.tag} />
                          );
                        }}
                      />
                    </Table>
                  </div>
                )}
              </AutoSizer>
            </Paper>
            <Mutation
              mutation={ADD_DESCRIPTOR}
              ignoreResults
              update={(cache, { data: { createDescriptor } }) => {
                const { descriptors } = cache.readQuery({
                  query: DESCRIPTORS_QUERY
                });
                cache.writeQuery({
                  query: DESCRIPTORS_QUERY,
                  data: { descriptors: descriptors.concat([createDescriptor]) }
                });
              }}
            >
              {createDescriptor => {
                return (
                  <Formik
                    initialValues={{ tag: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                      createDescriptor({
                        variables: { tag: values.tag }
                      });
                      values.tag = "";
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
                            onChange={handleChange}
                            value={values.tag}
                            name="tag"
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

export default Descriptors;
