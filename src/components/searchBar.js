import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <select
          className="selectpicker"
          onChange={this.props.onChange}
          id="searchOption"
        >
          <option value="date">Date</option>
          <option value="state" selected="selected">
            State
          </option>
          <option value="totalTestResults">TotalTestResults</option>
          <option value="positive">Positive</option>
          <option value="hospitalizedCurrently">Hospitalized</option>
        </select>
        <select
          className="selectpicker"
          onChange={this.props.onChange}
          id="compareOption"
          hidden
        >
          <option value="greater">≥</option>
          <option value="less">≤</option>
        </select>
        <input
          className="form-control"
          onChange={this.props.onChange}
          id="searchText"
          placeholder="Start Searching by State, search date in format 'yyyyMMdd'"
        />
        <button onClick={() => this.props.onClick(1)}>Refresh Image</button>
      </div>
    );
  }
}

export default SearchBar;
