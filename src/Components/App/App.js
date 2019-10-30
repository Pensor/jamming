import React from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchResults: [
				{
					name: 'Your Song',
					artist: 'RITA ORA',
					album: 'Your Song',
					id: 'fnvkjn'
				}
			],
			playlistName: 'My Playlist',
			playlistTracks: [
				{
					name: 'Your Song',
					artist: 'RITA ORA',
					album: 'Your Song',
					id: 'fnvkjn'
				},
				{
					name: 'Your Song',
					artist: 'RITA ORA',
					album: 'Your Song',
					id: 'fnvkjn'
				}
			]
		};

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	addTrack(track) {
		if (
			this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
		) {
			return;
		}
		const playlistTracks = this.state.playlistTracks.slice();
		playlistTracks.push(track);

		this.setState({ playlistTracks: playlistTracks });
	}

	removeTrack(track) {
		const playlistTracks = this.state.playlistTracks.filter(
			savedTrack => savedTrack.id !== track.id
		);

		this.setState({ playlistTracks: playlistTracks });
	}

	render() {
		return (
			<div>
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				<div className="App">
					<SearchBar />
					<div className="App-playlist">
						<SearchResults
							onAdd={this.addTrack}
							searchResults={this.state.searchResults}
						/>
						<Playlist
							onRemove={this.removeTrack}
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
