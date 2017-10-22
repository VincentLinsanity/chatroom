import React, { Component } from "react";

export default class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      message: "",
      myName: this.props.myName
    };
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.sendMessage();
  }
  handleKeyPress(e) {
    if (e.key == "Enter") {
      this.sendMessage();
    }
    return false;
  }

  sendMessage(e) {
    const message = this.state.message;
    const socket = this.state.socket;
    console.log(message)
    if (message) {
      const obj = {
        name: this.state.myName,
        message: message
      };
      socket.send(JSON.stringify(obj));
      this.setState({ message: "" });
    }
    return false;
  }
  render() {
    return (
      <div className="input-box">
        <div className="input">
          <input
            type="text"
            maxLength="140"
            placeholder="press enter"
            value={this.state.message}
            onKeyPress={this.handleKeyPress.bind(this)}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="button">
          <button type="button" onClick={this.handleClick.bind(this)}>
            submit
          </button>
        </div>
      </div>
    );
  }
}
