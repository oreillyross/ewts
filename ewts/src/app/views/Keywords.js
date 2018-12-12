import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import NavbarBottom from "./NavbarBottom";
import Paper from "@material-ui/core/Paper";
import { Column, Table, AutoSizer } from "react-virtualized";

const KEYWORDS_QUERY = gql`
  query Keywords {
    keywords {
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
                        return <a href={rowData.href}>{rowData.searchterm}</a>;
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

export default Keywords;
