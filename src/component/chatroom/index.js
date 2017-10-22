import React, { Component, PropTypes } from "react";
import ChatRoom from "./components/ChatRoom";
import Landing from "./components/landing";
import api from "../../api/Client";
import config from "../../config";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      login: false,
      socket: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.handleLogin();
  }

  handleKeyPress(e) {
    if (e.key == "Enter") {
      this.handleLogin();
    }
    return false;
  }

  handleLogin() {
    if (this.state.username === "") {
      alert("please enter your name");
      return;
    }
    const name = this.state.username;
    let socket = {};
    api
      .post("/chat/create", { name }, result => {
        if (result.name) {
          socket = new WebSocket(config.websocket);
          socket.onopen = () => {
            const data = {
              name: result.name,
              login: true
            };
            socket.send(JSON.stringify(data));
            this.setState({ socket, username: name, login: true });
          };
          socket.onclose = () => {
            alert("you left the room dut to inactivity");
            this.setState({ login: false, username: "" });
          };
        }
      })
      .catch(error => {
        if (error.status == "Conflict") {
          alert("Nickname already taken");
          return;
        }
        alert(error);
        return;
      });
  }

  render() {
    let renderDOM;
    if (this.state.login) {
      renderDOM = (
        <ChatRoom username={this.state.username} socket={this.state.socket} />
      );
    } else {
      renderDOM = (
        <Landing
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleKeyPress={this.handleKeyPress}
        />
      );
    }
    return <div>{renderDOM}</div>;
  }
}

export default App;
