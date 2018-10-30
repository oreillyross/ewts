import React from "react";
import ReactTable from "react-table";

const columns = [
  {
    Header: "Date",
    accessor: d =>
      new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      }).format(new Date(d.datetime)),
    id: "friendlyDate"
  },
  {
    Header: "Title",
    accessor: "title",
    minWidth: 200,
    className: "left"
  },
  {
    id: "sourceHref",
    Header: "Source",
    accessor: d => (
      <a target="_blank" href={d.href} rel="noopener noreferrer">
        {d.newsdesk}
      </a>
    )
  }
];

const EventTable = ({ sources }) => {
  console.log(sources);
  return <ReactTable data={sources} columns={columns} />;
};

export default EventTable;
