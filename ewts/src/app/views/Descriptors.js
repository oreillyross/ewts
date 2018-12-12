import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import { Column, Table, AutoSizer } from "react-virtualized";

const DESCRIPTORS_QUERY = gql`
  query Keywords {
    descriptorses {
      id
      tag
    }
  }
`;

const Descriptors = () => {
  return (
    <Query query={DESCRIPTORS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading data.......";
        if (error) return `Error: ${error.message}`;
        return (
          <Paper className="Paper">
            <AutoSizer disableHeight>
              {({ width }) => (
                <div>
                  <Table
                    width={width}
                    height={400}
                    headerHeight={40}
                    rowHeight={30}
                    rowCount={data.descriptorses.length}
                    rowGetter={({ index }) => data.descriptorses[index]}
                    headerClassName="headers"
                  >
                    <Column
                      label="Keywords"
                      dataKey="keywords"
                      width={800}
                      className="rows"
                      cellRenderer={({ rowData }) => {
                        return <a href={rowData.href}>{rowData.tag}</a>;
                      }}
                    />
                  </Table>
                </div>
              )}
            </AutoSizer>
          </Paper>
        );
      }}
    </Query>
  );
};

export default Descriptors;
