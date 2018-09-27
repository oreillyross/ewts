import React from "react";
import { Column, Table } from "react-virtualized";
import ReactTable from "react-table";

const EventDetails = () => {
  const data = [
    {
      title: "Russia to supply Syria with S-300 defense systems",
      description: `Syrian regime troops will receive S-300 missile defense systems from Russia 
                  within the next two weeks, Russian Defense Minister Sergei Shoigu said on Monday.
                  The modernized version of the Soviet-era system "is capable of intercepting aerial 
                  attacks at the distance of over 250 kilometers and simultaneously countering several 
                  targets," the minister said. The move comes after Moscow blamed Israel for indirectly 
                  causing the destruction of a Russian Il-20 reconnaissance plane last week. The incident 
                  claimed the lives of 15 Russian soldiers. "We are convinced that these measures will cool 
                  down the 'hot heads' and keep them from ill-conceived actions threatening out troops," 
                  Shoigu said in his televised address.`,
      keyword: "Syria",
      date: "2018-09-24",
      time: "00:00",
      category: "Regional"
    }
  ];

  const columns = [
    {
      Header: "Title",
      accessor: "title" // String-based value accessors!
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: props => <span className="number">{props.value}</span> // Custom cell components!
    },
    {
      id: "titleName", // Required because our accessor is not a string
      Header: "Title",
      accessor: d => d.title // Custom value accessors!
    },
    {
      Header: props => <span>Description</span>, // Custom header components!
      accessor: "description"
    }
  ];

  return <ReactTable data={data} columns={columns} />;
};

export default EventDetails;
