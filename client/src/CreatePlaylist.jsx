import React from "react";
import { Container, Title, Input } from "./styleComponents"

export default class CreatePlaylist extends React.Component {
    constructor() {
        super();
        const params = this.getHashParams();
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
        this.searchForSong = this.searchForSong.bind(this);
        this.addSongsToPlaylist = this.addSongsToPlaylist.bind(this);
    }

    componentDidMount() {
        console.log(this.state.accessToken)
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

    async searchForSong(title) {
        // get songs with title as search query
        let response = await fetch('https://api.spotify.com/v1/search?q=' + title +
            '&type=track&market=US&limit=25', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        // extract array of track item objects from response
        let data = await response.json()
        let songs = data.tracks.items;
        console.log(songs)

        // iterate through songs to find an exact title match
        let length = songs.length;
        for (var i = 0; i < length; i++) {
            if ((songs[i].name).toUpperCase() === title.toUpperCase()) {
                console.log(songs[i].uri)
                return songs[i].uri;
            }
        }
        // return null if no matches are found
        return null;
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

        // get songIDs for all tracks (do this first so a playlist isnt created before the message is validated)
        for (var i = 0; i < mLength; i++) {
            let id = await this.searchForSong(this.state.message[i]);
            console.log(id)
            if (id == null) {
                alert('Spotify could not find a song with the title ' + this.state.message[i] + '.');
                this.setState({ message: [] })
                return;
            }
            songIDs.push(id);
        }

        this.createPlaylist(songIDs);
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
