import React from "react";
import "../App.css";

class LandingContainer extends React.Component {
  render() {
    return (
      <div className="landing">
        <input className="message" placeholder="When I Send This" />
        <br />
        <input className="message" placeholder="Respond With This" />
        <br />
        <a href="#" className="btn">
          Configure
        </a>
      </div>
    );
  }
}

export default LandingContainer;
