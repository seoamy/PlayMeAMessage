
export function getHashParams() {
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

export async function searchForSong(title, accessToken) {
    // get songs with title as search query
    let response = await fetch('https://api.spotify.com/v1/search?q=' + title +
        '&type=track&market=US&limit=25', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
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