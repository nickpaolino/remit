import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";

class Header extends React.Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return (
          <div style={{ visibility: "hidden" }}>
            <a>Thinking...</a>
          </div>
        );
      case false:
        return (
          <div className="login">
            <a href="/auth/google">Login with Google</a>
          </div>
        );
      default:
        return (
          <div>
            <a href="/api/logout">Logout</a>
          </div>
        );
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="text-box">
        <div className="header">
          <Link className="logo" to="/">
            Remit
          </Link>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
