import React from "react";
import { Container, Title, Input } from "../styleComponents"
import { getHashParams, searchForSong } from "../createPlaylistFunctions"

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
        }

        let mLength = this.state.message.length;
        let songIDs = [];

        // ******************************************************************************************************************
        // ******************************************************************************************************************
        // ******************************************************************************************************************
        // TODO: get songIDs for all tracks (do this first so a playlist isnt created before the message is validated)
        //       figure out how to get different combinations/substrings of the string 
        // ******************************************************************************************************************
        // ******************************************************************************************************************
        // ******************************************************************************************************************
        for (var i = 0; i < mLength; i++) {
            let id = await searchForSong(this.state.message[i]);
            console.log(id)
            if (id == null) {
                alert('Spotify could not find a song with the title ' + this.state.message[i] + '.');
                this.setState({ message: [] })
                return;
            }
            songIDs.push(id);
        }
        if (songIDs.length) {
            this.createPlaylist(songIDs);
        }
        else {
            alert("You must add a message to populate your playlist!") // TODO: Keep playlist title and description states
        }
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
