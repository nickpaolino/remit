import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";

class Sender extends Component {
  state = {
    field: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.send(this.state.field);
  };

  handleChange = ({ target }) => {
    this.setState({ field: target.value });
  };

  send = Body => {
    // creates the headers for the POST request
    const headers = {
      "Content-Type": "application/json",
      Accepts: "application/json"
    };

    // the body currently consists of the to and from message
    const body = JSON.stringify({
      Body,
      notSMS: true,
      auth: this.props.auth
    });

    // make a post request to the db with the new command
    fetch("https://remitt.herokuapp.com/sms", {
      method: "POST",
      body,
      headers
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  render() {
    return (
      // if the state is configured from hitting the button, show the completed command
      // otherwise show the form so the user can enter one
      <div>
        <br />
        <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Sender);
