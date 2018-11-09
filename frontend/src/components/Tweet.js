import React, { Component } from "react";
import like from "../like.svg";
import "./Tweet.css";
import api from "../services/api";

export default class Tweet extends Component {

  handleLike = async () => {
    const { tweet } = this.props;
    await api.post(`likes/${tweet._id}`)
  }

  render() {
    const { tweet } = this.props;

    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="Like"/>
          {tweet.likes}
        </button>
      </li>
    );
  }
}
