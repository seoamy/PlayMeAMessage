# PlayMeAMessage
Using Spotify's Web API, this web app creates a playlist for you with song titles that spell out whatever message you enter.

## How to Run the App Locally
In a directory of your choosing, enter ``` git clone https://github.com/seoamy/PlayMeAMessage.git```

```cd``` into the directory

``` cd client ```

``` yarn ``` to install all dependencies for the client-side

``` yarn start ``` and open **http://localhost:3000/**

open a new tab on your terminal and ``` cd server ```

``` yarn ``` to install all dependencies for the server

Follow [the instructions here](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/) to create a Spotify application.  Rename `config.js.example` to `config.js` and fill in `client_id` and `client_secret` with the values for your new application.

``` node server.js ``` so that express is now listening on port 8888!
