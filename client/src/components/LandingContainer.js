import React, { Component } from "react";
import "../App.css";

class LandingContainer extends Component {
  state = {
    configured: false,
    toMessage: "",
    fromMessage: ""
  };

  handleClick = () => {
    this.setState({
      configured: !this.state.configured
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="landing">
        {this.state.configured ? (
          <p>{this.state.toMessage}</p>
        ) : (
          <input
            className="message"
            name="toMessage"
            placeholder="When I Send This"
            onChange={this.handleChange}
          />
        )}
        <br />
        {this.state.configured ? (
          <p>{this.state.fromMessage}</p>
        ) : (
          <input
            className="message"
            name="fromMessage"
            placeholder="Respond With This"
            onChange={this.handleChange}
          />
        )}
        <br />
        <p className="btn" onClick={this.handleClick}>
          {this.state.configured ? "Create New Command" : "Configure"}
        </p>
      </div>
    );
  }
}

export default LandingContainer;
