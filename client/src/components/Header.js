import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";

class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return <div style={{ visibility: "hidden" }} />;
      case false:
        return <a href="/auth/google">Login with Google</a>;
      default:
        return (
          <div>
            <div>
              <a>Hi, {this.props.auth.name}</a>
            </div>
            <div>
              <a href="/api/logout">Logout</a>
            </div>
          </div>
        );
    }
  };

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <Link className="logo" to="/">
            REMIT
          </Link>
        </div>
        <div className="header-right">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
