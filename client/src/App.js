import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CreatePlaylist from "./CreatePlaylist"
import { Emoji, Button, Container, Title, Text } from "./styleComponents"


class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      token: params.access_token
    }
  }

  // componentDidMount() {
  //   console.log(this.state.token)
  //   fetch('https://api.spotify.com/v1/me',
  //     { headers: { 'Authorization': 'Bearer ' + this.state.token } })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div style={{
        backgroundColor: "#CCF3FF",
        width: "100%",
        height: "100vh"
      }}
        className='App' >
        <Router>
          <Switch>
            <Route exact path="/">
              <Container>
                <Title>Play me a message.</Title>
                <Text>We will curate a playlist with song titles that match each word in your message. Perfect for gifting someone a playlist <Emoji symbol="❤️"></Emoji></Text>
                <Button>
                  <a href='http://localhost:8888'> Login to Spotify </a>
                </Button>
              </Container>
            </Route>
            <Route path="/createPlaylist">
              <CreatePlaylist></CreatePlaylist>
            </Route>
          </Switch>
        </Router>
      </div >
    );
  }

}
export default App;