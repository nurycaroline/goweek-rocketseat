import React, { Component } from "react";
import api from "../services/api";
import socket from "socket.io-client";
import twiterLogo from "../twitter.svg";
import "./Timeline.css";
import Tweet from "../components/Tweet";

export default class Timeline extends Component {
  state = {
    newTweet: "",
    tweets: []
  };

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get("tweets");
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket("http://localhost:3000");

    io.on("tweet", data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on("like", data => {
      this.setState({
        tweets: this.state.tweets.map(tweet => (tweet._id === data._id ? data : tweet))
      });
    });
  };

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;
    const { newTweet } = this.state;
    const content = newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post("tweets", {
      content,
      author
    });

    this.setState({ newTweet: "" });
  };

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  };

  render() {
    const { newTweet, tweets } = this.state;
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twiterLogo} alt="GoTwitter" />

        <form action="">
          <textarea
            onChange={this.handleInputChange}
            value={newTweet}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          {tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
