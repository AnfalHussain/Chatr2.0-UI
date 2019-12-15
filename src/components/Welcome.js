import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import icon from "../assets/images/iconC.png";

class Welcome extends Component {
  render() {
    return (
      <>
        {!this.props.user && (
          <>
            <header id="head" className="masthead  d-flex">
              <div
                id="head"
                className="container text-center  text-dark my-auto z-1"
              >
                <img
                  src={icon}
                  className="m-5 animated infinite zoomInDown slower delay-1s"
                  style={{ height: "200px" }}
                ></img>

                <h3 className="mb-5">
                  <p id="welcome">Login to see the messages</p>
                </h3>
                <Link
                  id="welcomelogin"
                  to="/login"
                  className="btn rounded-pill"
                >
                  Login
                </Link>
              </div>
            </header>
          </>
        )}
        <div className="overlay z-0" />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Welcome);
