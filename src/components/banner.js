import React, { Component } from "react";

class Banner extends Component {
  render() {
    let url = "";
    if (this.props.image) url = this.props.image.map((e) => e.url);

    return (
      <div className="banner">
        <div className="image">
          <img className="image" src={url} alt="cat" height="100px"></img>
        </div>
        <h1 className="display-3">Data Table Search</h1>
      </div>
    );
  }
}

export default Banner;
