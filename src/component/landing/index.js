import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api/Client";
import config from "../../config";
import "./index.css";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
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
            this.props.history.push({
              pathname: "/chatroom",
              socket,
              username: result.name
            });
          };
          socket.onclose = () => {
            alert("You leave the room because of the timeout");
            this.props.history.push({
              pathname: "/",
            });
          };
        }
      })
      .catch(error => {
        if (error.status === "Conflict") {
          alert("Nickname already taken");
          return;
        }
        alert(error);
        return;
      });
  }

  render() {
    return (
      <div className="login-box">
        <h2>Landing...</h2>
        <div className="input">
          <input
            type="text"
            placeholder="please enter your name"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="submit">
          <button type="button" onClick={this.handleClick}>
            submit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
