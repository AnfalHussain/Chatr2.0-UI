import React, { Component } from "react";
import spinner from "../assets/images/spinner.gif";

class Loading extends Component {
  render() {
    return (
      <div id="loading" className="container m-4 p-5">
        <div className="spinner mx-auto text-center ">
          <div
            style={{
              height: "500px",
              width: "950px",
              position: "relative",
              bottom: "150px",
              left: "200px",
              padding: "200px"
            }}
            id="bgIMG"
          >
            <img
              style={{
                position: "relative",
                bottom: "30px",
                width: "150px",
                height: "150px"
              }}
              src={spinner}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
