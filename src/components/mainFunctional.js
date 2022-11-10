import React, { useState, useEffect } from "react";
import covid from "../APIs/covid";
import cat from "../APIs/cats";
import Banner from "./banner";
import SearchBar from "./searchBar";
import { numericKeys } from "./columns";
import ProcessData from "./processData";

function MainFunctional() {
  const [data, setData] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState({
    option: "",
    text: "",
    compare: ""
  });

  // get covid data
  useEffect(() => {
    //covid.getCurrentCovidStats().then((response) => {
    covid.getHistoricDailyCovidStats().then((response) => {
      console.log("response", response);
      setData(response);
    });
  }, []);

  // get random cat image, refresh when click count is changed
  useEffect(() => {
    cat
      .getRandomCat()
      .then((response) => {
        console.log("response", response);
        setImage(response);
      })
      // catch network error
      .catch((error) => {
        console.log("Error", error);
      });
  }, [clickCount]);

  // handle image refresh button
  const handleClick = (click) => {
    console.log("Handle Click Called", clickCount);
    setClickCount(clickCount + click);
  };

  // handle delete data button
  const handleDelete = (date, state) => {
    console.log("Handle Delete Called", date, state);
    const filteredData = data.filter(
      (dt) => dt.date !== date || dt.state !== state
    );
    setData(filteredData);
  };

  // handle user inputs in search bar
  let handleInput = () => {
    let option = document.getElementById("searchOption").value;
    let compare = "";

    // unhide numeric comparator for numericKeys
    if (numericKeys.includes(option)) {
      document.getElementById("compareOption").hidden = false;
      compare = document.getElementById("compareOption").value;
    } else {
      document.getElementById("compareOption").hidden = true;
    }
    let lowerCaseText = document
      .getElementById("searchText")
      .value.toLowerCase();
    setInputText({ option: option, text: lowerCaseText, compare: compare });
  };

  return (
    <div>
      <Banner image={image} onClick={handleClick} />
      <SearchBar onChange={handleInput} onClick={handleClick}></SearchBar>
      <ProcessData
        search={inputText}
        data={data}
        onDelete={handleDelete}
        numericKeys={numericKeys}
      />
    </div>
  );
}

export default MainFunctional;
