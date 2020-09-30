import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CreatePlaylistView from "./views/CreatePlaylistView"
import { Emoji, Button, Container, Text } from "./styleComponents"


class App extends React.Component {
  render() {
    return (
      <div style={{
        backgroundColor: "#EA6654",
        width: "100%",
        height: "100vh"
      }}
        className='App' >
        <a href="/"><img src={require("./music-home-logo.png")} /></a>
        <Router>
          <Switch>
            <Route exact path="/">
              <Container>
                <img src={require("./playMeAMessage.png")} />
                <Text>We will curate a playlist with song titles that match each word in your message. Perfect for gifting someone a playlist <Emoji symbol="❤️"></Emoji></Text>
                <Button>
                  <a href='http://localhost:8888/login'> Login to Spotify </a>
                </Button>
              </Container>
            </Route>
            <Route path="/createPlaylist">
              <CreatePlaylistView></CreatePlaylistView>
            </Route>
          </Switch>
        </Router>
      </div >
    );
  }

}
export default App;