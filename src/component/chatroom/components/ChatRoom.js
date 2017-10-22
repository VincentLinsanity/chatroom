import React, { Component } from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    const socket = this.props.socket;
    this.state = {
      username: this.props.username,
      socket,
      messages: [],
      onlineUsers: {},
      onlineCount: 0,
      userhtml: ""
    };
    this.ready();
    this.handleLogout = this.handleLogout.bind(this);
  }

  generateMsgId() {
    return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
  }

  updateMsg(obj) {
    let messages = this.state.messages;
    const newMsg = {
      type: obj.type || "chat",
      username: obj.name,
      action: obj.message,
      msgId: this.generateMsgId(),
      time: this.generateTime()
    };
    messages = messages.concat(newMsg);
    this.setState({ messages: messages });
  }

  generateTime() {
    let hour = new Date().getHours(),
      minute = new Date().getMinutes();
    hour = hour == 0 ? "00" : hour;
    minute = minute < 10 ? "0" + minute : minute;
    return hour + ":" + minute;
  }

  handleLogout() {
    const socket = this.state.socket;
    const data = {
      name: this.state.username,
      logout: true
    };
    socket.send(JSON.stringify(data));
    window.location.reload();
  }

  ready() {
    const socket = this.state.socket;
    socket.onmessage = message => {
      const obj = JSON.parse(message.data);
      this.updateMsg(obj);
    };
  }

  render() {
    return (
      <div className="chat-room">
        <div className="welcome">
          <div className="room-name">Chatroom | {this.state.username}</div>
          <div className="button">
            <button onClick={this.handleLogout}>leave</button>
          </div>
        </div>
        <div ref="chatArea">
          <Messages
            messages={this.state.messages}
            myName={this.state.username}
          />
          <ChatInput myName={this.state.username} socket={this.state.socket} />
        </div>
      </div>
    );
  }
}
