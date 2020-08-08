import React from "react";
import { Emoji, Button, Container, Title, Text, Input } from "./styleComponents"

export default class CreatePlaylist extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            accessToken: params.access_token,
            userID: null,
            playlistTitle: "",
            playlistDescription: "",
            message: [],
            playlistID: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentDidMount() {
        fetch('https://api.spotify.com/v1/me',
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then(response => response.json())
            .then(data => this.setState({ userID: data.id }))
    }

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

    handleSubmit(event) {
        if (this.state.playlistTitle === "" || this.state.message === "") {
            alert("You must have a playlist title and message!")
        }
        fetch('https://api.spotify.com/v1/users/' + this.state.userID + '/playlists', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": this.state.playlistTitle,
                "description": this.state.playlistDescription,
                "public": false
            })
        }).then(response => response.json())
            .then(data => console.log(data))
    }

    handleTitleChange(event) {
        this.setState({ playlistTitle: event.target.value })
    }

    handleDescriptionChange(event) {
        this.setState({ playlistDescription: event.target.value })
    }

    handleMessageChange(event) {
        this.setState({ message: event.target.value.split(" ") })
    }



    render() {
        console.log(this.state.accessToken)
        return (
            <div style={{
                backgroundColor: "#CCF3FF",
                width: "100%",
                height: "100vh"
            }}>
                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <label><Title>Playlist title:</Title></label>
                        <Input type="text" onChange={this.handleTitleChange}></Input>
                        <label><Title>Playlist description:</Title></label>
                        <Input type="text" onChange={this.handleDescriptionChange} />
                        <label><Title>Message in playlist:</Title></label>
                        <Input type="text" onChange={this.handleMessageChange} />
                        <input type="submit" value="generate my playlist"
                            style={{
                                margin: "50px",
                                backgroundColor: "#FF6D90",
                                border: "none",
                                color: "white",
                                borderRadius: "50px",
                                width: "300px",
                                height: "70px",
                                fontSize: "20px",
                                boxShadow: "5px 7px 3px #8888",
                                transition: "0.25s all ease",
                                fontFamily: "Poppins, sans-serif"
                            }}
                        />
                    </form>
                </Container>
            </div>
        );
    }
}
