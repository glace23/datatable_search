import React, { useState, useMemo } from "react";
import { DataTable } from "./dataTable";
import { COLUMNS } from "./columns";

const SortData = (data, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  // cache sorted data
  const sortedData = useMemo(() => {
    let sortedData = [...data];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        // asecending
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        // descending
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        // equal
        return 0;
      });
    }
    return sortedData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return { data: sortedData, requestSort, sortConfig };
};

const filterData = (props, data) => {
  const sortedData = [...data];
  const search = props.search;
  if (search.text === "") {
    return sortedData;
  } else {
    return sortedData.filter((dt) => {
      // compare numeric input
      if (props.numericKeys.includes(search.option)) {
        if (search.compare === "greater") {
          return dt[props.search.option] >= parseInt(search.text, 10);
        } else {
          return dt[props.search.option] <= parseInt(search.text, 10);
        }
      } else {
        // String contains input
        return dt[props.search.option]
          .toString()
          .toLowerCase()
          .includes(search.text);
      }
    });
  }
};

const ProcessData = (props) => {
  const { data, requestSort, sortConfig } = SortData(props.data);

  // adds ascending or descending arrow
  const addClassSymbols = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  let filteredData = filterData(props, data);

  return (
    <DataTable
      search={props.search}
      data={filteredData}
      columns={COLUMNS}
      onDelete={props.onDelete}
      onSort={requestSort}
      numericKeys={props.numericKeys}
      addClassSymbols={addClassSymbols}
    />
  );
};

export default ProcessData;
