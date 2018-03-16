import React, { Component } from "react";
import "../App.css";

class LandingContainer extends Component {
  state = {
    // this determines if the configured button has been clicked or not
    configured: false,
    // this is the message that is going to be sent to the phone number
    toMessage: "",
    // this is the message that is received when the toMessage is sent
    fromMessage: ""
  };

  handleClick = () => {
    // the piece of state representing the text field values
    let body;

    // if a command has been set, and the button is clicked, it means the user wants to edit
    if (this.state.configured) {
      // so reset the text field values
      body = { toMessage: "", fromMessage: "" };
    } else {
      // send request to backend to save command
      this.createCommand();
      // do not update the text field values
      body = {};
    }

    // the command is configured only if there is text in both fields
    if (this.state.toMessage.length && this.state.fromMessage.length) {
      this.setState({
        configured: !this.state.configured,
        ...body
      });
    }
  };

  createCommand = () => {
    const headers = {
      "Content-Type": "application/json",
      Accepts: "application/json"
    };

    const body = {
      toMessage: this.state.toMessage,
      fromMessage: this.state.fromMessage
    };

    fetch("https://remitt.herokuapp.com/commands", {
      method: "POST",
      body: JSON.stringify(body),
      headers
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  handleChange = ({ target }) => {
    // extract the value and name from the JS event target
    const { value, name } = target;
    // updates the text fields
    this.setState({ [name]: value });
  };

  showCommand = () => {
    // show the entered command / response
    return (
      <div className="command">
        <p>{this.state.toMessage}</p>
        <br />
        <p>{this.state.fromMessage}</p>
        <br />
        <p className="btn" onClick={this.handleClick}>
          Create New Command
        </p>
      </div>
    );
  };

  showForm = () => {
    // show the form to create a command / response
    return (
      <div className="form">
        <input
          className="message"
          name="toMessage"
          placeholder="When I Send This"
          onChange={this.handleChange}
        />
        <br />
        <input
          className="message"
          name="fromMessage"
          placeholder="Respond With This"
          onChange={this.handleChange}
        />
        <br />
        <p className="btn" onClick={this.handleClick}>
          Configure
        </p>
      </div>
    );
  };

  render() {
    return (
      // if the state is configured from hitting the button, show the completed command
      // otherwise show the form so the user can enter one
      <div className="landing">
        {this.state.configured ? this.showCommand() : this.showForm()}
      </div>
    );
  }
}

export default LandingContainer;
