import React from "react";
import { Container, Title, Input, InputTitle } from "../styleComponents"
import { getHashParams, searchForSong, getOrderedCombos } from "../createPlaylistFunctions"

export default class CreatePlaylistView extends React.Component {
    constructor() {
        super();
        const params = getHashParams();
        this.state = {
            accessToken: params.access_token,
            userID: null,
            playlistID: null,
            playlistTitle: "",
            playlistDescription: "",
            message: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);
        this.addSongsToPlaylist = this.addSongsToPlaylist.bind(this);
    }

    componentDidMount() {
        // get user's access token/id
        fetch('https://api.spotify.com/v1/me',
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then(response => response.json())
            .then(data => this.setState({ userID: data.id }))
    }

    createPlaylist(songIDs) {
        //create a playlist on the user's account
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
            .then(data => this.setState({ playlistID: data.id },
                // add songs to playlist asynchronously after the playlist is created
                () => this.addSongsToPlaylist(songIDs)))
    }

    addSongsToPlaylist(songIDs) {
        if (this.state.playlistID == null || this.state.userID == null) return;

        // add all tracks to the playlist
        fetch('https://api.spotify.com/v1/playlists/' + this.state.playlistID + '/tracks', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // use array of all songIDs
            body: JSON.stringify({
                "uris": songIDs
            })
        })
    }


    async handleSubmit(event) {
        if (this.state.playlistTitle === "" || this.state.message === "") {
            alert("You must have a playlist title and message!")
            return
        }

        let combos = getOrderedCombos(this.state.message)

    }

    // TODO: Redux state management
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
        return (
            <div style={{
                backgroundColor: "#EA6654",
                width: "100%",
                height: "100vh"
            }}>
                <Container>
                    <Title>Let's Make Your Playlist!</Title>
                    <form onSubmit={this.handleSubmit}>
                        <label><InputTitle>Playlist title:</InputTitle></label>
                        <Input type="text" onChange={this.handleTitleChange}></Input>
                        <label><InputTitle>Playlist description:</InputTitle></label>
                        <Input type="text" onChange={this.handleDescriptionChange} />
                        <label><InputTitle>Message in playlist:</InputTitle></label>
                        <Input type="text" onChange={this.handleMessageChange} />
                        <input type="submit" value="Generate my playlist"
                            style={{
                                margin: "50px",
                                backgroundColor: "#3E2D2D",
                                border: "none",
                                color: "white",
                                borderRadius: "50px",
                                width: "300px",
                                height: "70px",
                                fontSize: "20px",
                                boxShadow: "5px 7px 10px #403D3D",
                                transition: "0.25s all ease",
                                fontFamily: "Karla, sans-serif",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        />
                    </form>
                </Container>
            </div>
        );
    }
}
