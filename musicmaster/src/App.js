import React, { Component } from 'react';
import './App.css';
import Profile from './Profile';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const TOKEN = 'SPOTIFY TOKEN HERE';
    fetch(FETCH_URL, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + TOKEN }
    })
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist }); // same name variable and state key (artist)
      })
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

        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">

        </div>

      </div>
    );
  }
}

export default App;
