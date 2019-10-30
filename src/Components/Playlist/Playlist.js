import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
	render() {
		return (
			<div className="Playlist">
				<input defaultValue={'New Playlist'} />
				<TrackList
					onRemove={this.props.onRemove}
					isRemoval={true}
					tracks={this.props.playlistTracks}
				/>
				<button className="Playlist-save">SAVE TO SPOTIFY</button>
			</div>
		);
	}
}

export default Playlist;
