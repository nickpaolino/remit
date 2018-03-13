import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";

class Header extends React.Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="header">
        <Link to="/">Remit</Link>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
