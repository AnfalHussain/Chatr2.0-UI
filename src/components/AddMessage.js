import React, { Component } from "react";
// Delete any unused components or code
class AddMessage extends Component {
  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitMessage}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.msg}
              onChange={this.textChangeHandler}
            />{" "}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddMessage;
