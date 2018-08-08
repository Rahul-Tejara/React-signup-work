import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import "./styles.css";
import Button from "react-bootstrap-button-loader";
import Emailvalidator from "email-validator";

function validate(email, username, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0, //true if email is empty
    username: username.length === 0, //true if username is empty
    password: password.length === 0 //true if password is empty
  };
}
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",

      touched: {
        email: false,
        username: false,
        password: false
      }
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  // handleEmailChange = evt => {
  //   this.setState({ email: evt.target.value });
  // };

  // handleUsernameChange = evt => {
  //   this.setState({ username: evt.target.value });
  // };

  // handlePasswordChange = evt => {
  //   this.setState({ password: evt.target.value });
  // };
  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, username, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  };
  canBeSubmitted() {
    const errors = validate(
      this.state.email,
      this.state.username,
      this.state.password
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(
      this.state.email,
      this.state.username,
      this.state.password
    );
    const { email, username, password } = this.state;
    console.log(email, username, password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={shouldMarkError("email") ? "error" : ""}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleChange}
          onBlur={this.handleBlur("email")}
        />
        <span className={shouldMarkError("email") ? "error" : "hidden"}>
          invalid email
        </span>

        <input
          className={shouldMarkError("username") ? "error" : ""}
          type="text"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleChange}
          onBlur={this.handleBlur("username")}
        />
        <span className={shouldMarkError("username") ? "error" : "hidden"}>
          invalid username
        </span>

        <input
          className={shouldMarkError("password") ? "error" : ""}
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleChange}
          onBlur={this.handleBlur("password")}
        />
        <span className={shouldMarkError("password") ? "error" : "hidden"}>
          invalid password
        </span>

        <button disabled={isDisabled}>Sign up</button>
      </form>
    );
  }

  validateForm() {
    return (
      Emailvalidator.validate(this.state.email) &&
      this.state.email.length > 0 &&
      this.state.password.length > 6 &&
      this.state.password === this.state.confirmPassword
    );
  }
}
