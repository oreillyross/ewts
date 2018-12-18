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

const KEYWORDS_QUERY = gql`
  query Keywords {
    keywords {
      id
      searchterm
    }
  }
`;

const ADD_KEYWORD = gql`
  mutation createKeyword($searchterm: String!) {
    createKeyword(data: { searchterm: $searchterm }) {
      id
      searchterm
    }
  }
`;

const DELETE_KEYWORD = gql`
  mutation deleteKeyword($id: ID!) {
    deleteKeyword(where: { id: $id }) {
      id
    }
  }
`;

const UPDATE_KEYWORD = gql`
  mutation updateKeyword($id: ID!, $searchterm: String!) {
    updateKeyword(data: { searchterm: $searchterm }, where: { id: $id }) {
      searchterm
      id
    }
  }
`;

const EditKeyword = ({ id, searchterm, updateEdit }) => {
  return (
    <div>
      <Mutation mutation={UPDATE_KEYWORD}>
        {(updateKeyword, { data }) => {
          return (
            <Formik initialValues={{ id, searchterm }}>
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
                    name="searchterm"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    onBlur={e => {
                      updateKeyword({
                        variables: {
                          id: values.id,
                          searchterm: values.searchterm
                        }
                      });
                      updateEdit(false);
                    }}
                    value={values.searchterm}
                  />
                );
              }}
            </Formik>
          );
        }}
      </Mutation>
      <Mutation
        mutation={DELETE_KEYWORD}
        update={(cache, { data: { deleteKeyword } }) => {
          const { keywords } = cache.readQuery({ query: KEYWORDS_QUERY });
          cache.writeQuery({
            query: KEYWORDS_QUERY,
            data: { keywords: keywords.filter(keyword => keyword.id !== id) }
          });
        }}
      >
        {deleteKeyword => {
          return (
            <Delete
              onClick={e => {
                deleteKeyword({ variables: { id: id } });
                updateEdit(false);
              }}
            />
          );
        }}
      </Mutation>
    </div>
  );
};

const KeywordRow = ({ id, searchterm }) => {
  const [editing, updateEdit] = useState(false);

  if (!editing) {
    return (
      <StyledKeywordRow
        onClick={e => {
          updateEdit(!editing);
        }}
      >
        {searchterm}
      </StyledKeywordRow>
    );
  } else {
    return (
      <EditKeyword
        id={id}
        searchterm={searchterm}
        onClick={e => updateEdit(!editing)}
        updateEdit={updateEdit}
      />
    );
  }
};
const StyledKeywordRow = styled.div`
  font-size: 1.2em;
  background-color: #e9ece5;
  &:hover {
    background-color: #b3c2bf;
  }
`;

const Keywords = () => {
  return (
    <Query query={KEYWORDS_QUERY}>
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
                      rowCount={data.keywords.length}
                      rowGetter={({ index }) => data.keywords[index]}
                      headerClassName="headers"
                    >
                      <Column
                        label="Keywords"
                        dataKey="keywords"
                        width={800}
                        className="rows"
                        cellRenderer={({ rowData }) => {
                          return (
                            <KeywordRow
                              id={rowData.id}
                              searchterm={rowData.searchterm}
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
              mutation={ADD_KEYWORD}
              ignoreResults
              update={(cache, { data: { createKeyword } }) => {
                const { keywords } = cache.readQuery({ query: KEYWORDS_QUERY });
                cache.writeQuery({
                  query: KEYWORDS_QUERY,
                  data: { keywords: keywords.concat([createKeyword]) }
                });
              }}
            >
              {createKeyword => {
                return (
                  <Formik
                    initialValues={{ searchterm: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                      createKeyword({
                        variables: { searchterm: values.searchterm }
                      });
                      values.searchterm = "";
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
                            value={values.searchterm}
                            name="searchterm"
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

export default Keywords;
