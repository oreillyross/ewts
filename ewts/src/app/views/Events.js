import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Column, Table, AutoSizer } from "react-virtualized";
import styles from "./Events.module.css";
import Input from "@material-ui/icons/Input";
import Read from "@material-ui/icons/Drafts";
import Markunread from "@material-ui/icons/Markunread";
import EventDetails from "./EventDetails";
import { Route, Redirect } from "react-router-dom";

const _rowClassName = ({ index }) => {
  if (index < 0) {
    return styles.headerRow;
  } else {
    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  }
};

const EVENTSQUERY = gql`
  {
    allEvents {
      id
      title
      description
      source
      href
      unread
    }
  }
`;

const Events = ({ history }) => (
  <Query query={EVENTSQUERY}>
    {({ loading, error, data }) => {
      if (loading) return "Loading data.......";
      if (error) return `Error: ${error.message}`;
      return (
        <AutoSizer disableHeight>
          {({ width }) => (
            <div>
              <Table
                width={width}
                height={400}
                headerHeight={40}
                rowHeight={30}
                rowCount={data.allEvents.length}
                rowGetter={({ index }) => data.allEvents[index]}
                rowClassName={_rowClassName}
                headerClassName="headers"
                onRowClick={({ rowData }) => {
                  history.push(`/eventdetails/${rowData.id}`);
                }}
              >
                <Column
                  label="Title"
                  dataKey="title"
                  width={800}
                  className="rows"
                  cellRenderer={({ rowData }) => {
                    return <a href={rowData.href}>{rowData.title}</a>;
                  }}
                />
                <Column
                  label="Actions"
                  dataKey="actions"
                  width={140}
                  cellRenderer={({ rowData }) => {
                    return rowData.unread ? (
                      <Markunread color="primary" />
                    ) : (
                      <Read />
                    );
                  }}
                />
              </Table>
            </div>
          )}
        </AutoSizer>
      );
    }}
  </Query>
);

export default Events;
