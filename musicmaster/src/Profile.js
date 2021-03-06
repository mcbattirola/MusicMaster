import React, { Component } from 'react';
import './App.css';

class Profile extends Component {


    formatFollowers(num) {
        if (num != '')
            return num + ' followers';
        else return '';
    }

    render() {
        let artist = { name: '', followers: { total: '' }, images: [{ url: '' }], genres: [] };
        artist = this.props.artist !== null ? this.props.artist : artist;
        return (
            <div className="profile">
                {
                    artist.images[0] != null ?
                        <img
                            alt="Profile"
                            className="profile-img"
                            src={artist.images[0].url}
                        />
                        :
                        <div> no image </div>
                }


                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-followers">{this.formatFollowers(artist.followers.total)} </div>
                    <div className="profile-genres">
                        {
                            artist.genres.map((genre, k) => {
                                genre = genre !== artist.genres[artist.genres.length - 1] ?
                                    `${genre},` : `${genre}`;
                                return (
                                    <span key={k}>{genre} </span>
                                )
                            })
                        }
                    </div>
                </div>


            </div>
        )
    }
}

export default Profile;
