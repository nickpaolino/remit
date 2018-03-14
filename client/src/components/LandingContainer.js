import React from "react";
import "../App.css";

class LandingContainer extends React.Component {
  render() {
    return (
      <div className="landing">
        <p className="message">When I Send This</p>
        <br />
        <p className="message">Respond With This</p>
        <br />
        <a href="#" className="btn btn-white btn-animated">
          Configure
        </a>
      </div>
    );
  }
}

export default LandingContainer;
