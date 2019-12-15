import React, { Component } from "react";

class SearchChannelBar extends Component {
  state = { query: "" };

  handleChange = event => {
    this.setState({ query: event.target.value });
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div
        className="form-group col-lg-6 col-12 mx-auto rounded-pill border-2  "
        style={{
          position: "relative",
          left: "50px",
          top: "20px",
          border: "1px solid transparent",
          margin: "20px"
        }}
      >
        <div className="input-group my-3 ">
          <input
            className="form-control rounded-pill text-white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.658)" }}
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="🔎 Search Chat..."
          />
        </div>
      </div>
    );
  }
}

export default SearchChannelBar;
