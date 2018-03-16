import React from "react";
import "../App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import LandingContainer from "./LandingContainer";
import Sender from "./Sender";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="app">
            <Header />
            <LandingContainer />
            <Route exact path="/sender" component={Sender} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
