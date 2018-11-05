import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Column, Table } from "react-virtualized";
import styles from "./Events.module.css";

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

const Events = () => (
  <Query query={EVENTSQUERY}>
    {({ loading, error, data }) => {
      if (loading) return "Loading data.......";
      if (error) return `Error: ${error.message}`;
      const titles = data.allEvents.map(event => event.title);
      return (
        <Table
          width={1400}
          height={500}
          headerHeight={40}
          rowHeight={30}
          rowCount={data.allEvents.length}
          rowGetter={({ index }) => data.allEvents[index]}
          rowClassName={_rowClassName}
          headerClassName="headers"
        >
          <Column label="Title" dataKey="title" width={800} className="rows" />
        </Table>
      );
    }}
  </Query>
);

export default Events;
