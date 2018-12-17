import React, { useState } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import { Column, Table, AutoSizer } from "react-virtualized";
import { Formik } from "formik";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

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

const EditKeyword = ({ id, searchterm }) => {
  console.log(id);
  return <div>{searchterm}</div>;
};

const KeywordRow = ({ id, searchterm }) => {
  const [editing, updateEdit] = useState(false);

  console.log(editing);
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
