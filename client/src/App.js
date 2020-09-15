import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CreatePlaylist from "./CreatePlaylist"
import { Emoji, Button, Container, Title, Text } from "./styleComponents"


class App extends React.Component {

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
                  <a href='http://localhost:8888/login'> Login to Spotify </a>
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