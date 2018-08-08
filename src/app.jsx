import React from "react";
import SignupFrom from "./signupComp.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <SignupFrom />;
  }
}
