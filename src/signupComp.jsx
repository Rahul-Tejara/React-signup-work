import React from "react";
import "./styles.css";
import Emailvalidator from "email-validator";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function validate(email, username, password, confpassword) {
  return {
    email: !Emailvalidator.validate(email) || email.length === 0,
    username: username.length < 20,
    password: password.length < 6,
    confpassword: confpassword != password || password.length < 6
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
    const { email, username, password, confpassword, startDate } = this.state;
    console.log(
      "usename is-: " +
        username +
        "user email is-:" +
        email +
        "userSelected Date is-:" +
        startDate.format("LL")
    );
    alert(
      "usename is-: " +
        username +
        "\nuser email is-:" +
        email +
        "\nuserSelected Date is-:" +
        startDate.format("LL")
    );
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
          onChange={evt => this.setState({ username: evt.target.value })}
          onBlur={this.handleBlur("username")}
        />
        <span className={shouldMarkError("username") ? "error" : "hidden"}>
          invalid username-: please enter atleast 20 character
        </span>
        <input
          className={shouldMarkError("email") ? "error" : ""}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={evt => this.setState({ email: evt.target.value })}
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
          onChange={evt => this.setState({ password: evt.target.value })}
          onBlur={this.handleBlur("password")}
        />
        <span className={shouldMarkError("password") ? "error" : "hidden"}>
          invalid password-: please enter atleast 6 character
        </span>
        <input
          className={shouldMarkError("password") ? "error" : ""}
          type="password"
          placeholder="Confirm password"
          value={this.state.confpassword}
          onChange={evt => this.setState({ confpassword: evt.target.value })}
          onBlur={this.handleBlur("confpassword")}
        />
        <span className={shouldMarkError("confpassword") ? "error" : "hidden"}>
          not matching password
        </span>
        <DatePicker
          selected={this.state.startDate}
          onChange={evt => this.setState({ startDate: evt })}
        />
        <button disabled={isDisabled}>Signup</button>
      </form>
    );
  }
}
