import React, { Component } from "react";
import twiterLogo from "../twitter.svg";
import "./Login.css";

export default class Login extends Component {
  state = {
    username: ""
  };

  handleInputChange = e => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username } = this.state;

    if (!username.length) return;

    localStorage.setItem("@GoTwitter:username", username);
    this.props.history.push("/timeline");
  };

  render() {
    const { username } = this.state;
    return (
      <div className="login-wrapper">
        <img src={twiterLogo} alt="Twitter" />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            value={username}
            placeholder="Nome de usuário"
            type="text"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}
