import React, { Component } from "react";
import "../App.css";

class LandingContainer extends Component {
  state = {
    configured: false
  };

  handleClick = () => {
    this.setState({
      configured: !this.state.configured
    });
  };

  render() {
    return (
      <div className="landing">
        <input className="message" placeholder="When I Send This" />
        <br />
        <input className="message" placeholder="Respond With This" />
        <br />
        <p className="btn" onClick={this.handleClick}>
          Configure
        </p>
      </div>
    );
  }
}

export default LandingContainer;
