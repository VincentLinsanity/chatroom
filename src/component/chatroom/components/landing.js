import React, { Component } from "react";

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-box">
        <h2>Landing...</h2>
        <div className="input">
          <input
            type="text"
            placeholder="please enter your name"
            onChange={this.props.handleChange}
            onKeyPress={this.props.handleKeyPress}
          />
        </div>
        <div className="submit">
          <button type="button" onClick={this.props.handleClick}>
            submit
          </button>
        </div>
      </div>
    );
  }
}
