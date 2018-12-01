import React, { Component } from 'react';
import './App.css';
import Profile from './Profile';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      ACCESS_TOKEN: '',
    }    
  }
  

  componentDidMount(){
    this.spotifyRefresh();
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const TOKEN = this.state.ACCESS_TOKEN;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' +  TOKEN}
    })
      .then(response => response.json())
      .then(json => {
        if (json.error != null && json.error.status == 401) {
          this.spotifyRefresh();
        }
        const artist = json.artists.items[0];
        this.setState({ artist }); // same name variable and state key (artist)
      })
      .catch(err => console.log('log do erro: ', err))
  }

  spotifyRefresh() {
    // Get the hash of the url
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = '';

    // Set token
    let _token = hash.access_token;
    this.setState({ ACCESS_TOKEN: _token });

    const authEndpoint = 'https://accounts.spotify.com/authorize';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = 'c9f89abfac4b4d79813588a358e71419';
    const redirectUri = 'http://localhost:3000';
    const scopes = [
      'user-read-birthdate',
      'user-read-email',
      'user-read-private'
    ];

    // If there is no token, redirect to Spotify authorization
    if (!_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
    }
  }




  render() {
    return (
      <div className="App">
      
        <div className="App-title"> Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search an artist..."
              query={this.state.query}
              onChange={event => { this.setState({ query: event.target.value }) }}
              onKeyPress={event => {
                if (event.key == 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist != null
            ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <div className="Gallery">

              </div>
            </div>
            : <div> </div>
        }

      </div>
    );
  }
}

export default App;
