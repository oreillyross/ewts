import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import { Column, Table, AutoSizer } from "react-virtualized";
import { Formik } from "formik";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

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
    createKeyword(searchterm: $searchterm) {
      id
      searchterm
    }
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
                            <a href={rowData.href}>{rowData.searchterm}</a>
                          );
                        }}
                      />
                    </Table>
                  </div>
                )}
              </AutoSizer>
            </Paper>
            <Mutation mutation={ADD_KEYWORD}>
              {(createKeyword, { data }) => {
                return (
                  <Formik
                    initialValues={{ searchterm: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                      createKeyword(data);
                      console.log(values);
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
