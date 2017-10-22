import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

export default class Messages extends Component {
  componentDidUpdate() {
    const messageList = ReactDOM.findDOMNode(this.refs.messages);
    window.scrollTo(0, messageList.clientHeight + 50);
  }
  render() {
    const myName = this.props.myName;
    const oneMessage = this.props.messages.map(message => {
      console.log(message);
      return (
        <Message
          key={message.msgId}
          msgType={message.type}
          msgUser={message.username}
          action={message.action}
          isMe={myName == message.username ? true : false}
          time={message.time}
        />
      );
    });
    return (
      <div className="messages" ref="messages">
        {oneMessage}
      </div>
    );
  }
}

class Message extends Component {
  render() {
    if (this.props.msgType == "system") {
      return (
        <div className="one-message system-message">
          {this.props.action}{" "}
          <span className="time">&nbsp;{this.props.time}</span>
        </div>
      );
    } else {
      return (
        <div
          className={this.props.isMe ? "me one-message" : "other one-message"}
        >
          <p className="time">
            <span>{this.props.msgUser}</span> {this.props.time}
          </p>
          <div className="message-content">{this.props.action}</div>
        </div>
      );
    }
  }
}
