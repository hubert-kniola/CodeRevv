import React, { Component } from "react";

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "XD",
    };
  }

  changeText = () => {
    const { message } = this.state;

    this.setState({ message: message + "~" });
  };

  render() {
    return <div onClick={this.changeText}>{this.state.message}</div>;
  }
}
