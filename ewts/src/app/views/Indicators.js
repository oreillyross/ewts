import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import NavbarBottom from "./NavbarBottom";
import Paper from "@material-ui/core/Paper";
import { Column, Table, AutoSizer } from "react-virtualized";

const INDICATORS_QUERY = gql`
  query Indicators {
    indicators {
      id
      title
    }
  }
`;

const Indicators = () => {
  return (
    <Query query={INDICATORS_QUERY}>
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
                    rowCount={data.indicators.length}
                    rowGetter={({ index }) => data.indicators[index]}
                    headerClassName="headers"
                  >
                    <Column
                      label="Indicators"
                      dataKey="indicators"
                      width={800}
                      className="rows"
                      cellRenderer={({ rowData }) => {
                        return <a href={rowData.href}>{rowData.title}</a>;
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

export default Indicators;
