import React from "react";
import "./styles.css";
import Emailvalidator from "email-validator";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function validate(email, username, password, confpassword) {
  // true means invalid, so our conditions got reversed
  return {
    email: !Emailvalidator.validate(email) || email.length === 0, //true if email is empty
    username: username.length < 20, //true if username is empty
    password: password.length < 6, //true if password is empty
    confpassword: confpassword != password
  };
}
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confpassword: "",
      startDate: moment(),

      touched: {
        email: false,
        username: false,
        password: false,
        confpassword: false
      }
    };
  }

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handleUsernameChange = evt => {
    this.setState({ username: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };
  handleDateChange = evt => {
    // console.log(evt.target.value);
    this.setState({ startDate: evt.target.value });
  };
  handleConfPasswordChange = evt => {
    this.setState({ confpassword: evt.target.value });
  };
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
      this.state.password,
      this.state.confpassword
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(
      this.state.email,
      this.state.username,
      this.state.password,
      this.state.confpassword
    );
    const { email, username, password, confpassword } = this.state;

    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <h1> Sign up </h1>
        <input
          className={shouldMarkError("username") ? "error" : ""}
          type="text"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onBlur={this.handleBlur("username")}
        />
        <span className={shouldMarkError("username") ? "error" : "hidden"}>
          invalid username
        </span>
        <input
          className={shouldMarkError("email") ? "error" : ""}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onBlur={this.handleBlur("email")}
        />
        <span className={shouldMarkError("email") ? "error" : "hidden"}>
          invalid email
        </span>
        <input
          className={shouldMarkError("password") ? "error" : ""}
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onBlur={this.handleBlur("password")}
        />
        <span className={shouldMarkError("password") ? "error" : "hidden"}>
          invalid password
        </span>
        <input
          className={shouldMarkError("password") ? "error" : ""}
          type="password"
          placeholder="Confirm password"
          value={this.state.confpassword}
          onChange={this.handleConfPasswordChange}
          onBlur={this.handleBlur("confpassword")}
        />
        <span className={shouldMarkError("confpassword") ? "error" : "hidden"}>
          not matching password
        </span>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDateChange}
        />
        <button disabled={isDisabled}>Signup</button>
      </form>
    );
  }
}
