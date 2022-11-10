import React from "react";
import { format } from "date-fns";

export const numericKeys = [
  "positive",
  "totalTestResults",
  "hospitalizedCurrently"
];

export const COLUMNS = [
  {
    Header: "Date",
    Footer: "Date",
    accessor: "date",
    sticky: "left",
    Cell: ({ value }) => {
      let date = new Date(
        String(value).substring(0, 4) +
          "-" +
          String(value).substring(4, 6) +
          "-" +
          String(value).substring(6, 9)
      );

      // Error check if date is valid
      if (isNaN(date)) {
        console.log("Error with date, defaulting to 2020-01-01");
        date = new Date("2020-01-01");
      }

      const dateOnly = new Date(
        date.valueOf() + date.getTimezoneOffset() * 60 * 1000
      );

      return format(dateOnly, "yyyy-MM-dd");
    }
  },
  {
    Header: "State",
    Footer: "State",
    accessor: "state",
    sticky: "left"
  },
  {
    Header: "Total Tests",
    Footer: "Total Tests",
    accessor: "totalTestResults",
    sticky: "left"
  },
  {
    Header: "Positive",
    Footer: "Positive",
    accessor: "positive",
    sticky: "left"
  },
  {
    Header: "Hospitalized",
    Footer: "Hospitalized",
    accessor: "hospitalizedCurrently",
    sticky: "left"
  },
  {
    Header: "Delete",
    Footer: "Delete",
    accessor: "delete",
    sticky: "left",
    Cell: (props) => {
      return (
        <button
          className="delete"
          onClick={() => {
            props.passedProps.onDelete(
              props.row.values.date,
              props.row.values.state
            );
          }}
        >
          &#x2715;
        </button>
      );
    }
  }
];
