let accessToken;
const clientID = '21cf846e711745e2a1ea43deb65aaf60';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			console.log(accessToken);
			return accessToken;
		}
		const url = window.location.href;
		const accessTokenMatch = url.match(/access_token=([^&]*)/);
		const expiresInMatch = url.match(/expires_in=([^&]*)/);
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			let expiresIn = expiresInMatch[1];
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
		}
	},

	search(term) {
		accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
			.then(response => response.json())
			.then(jsonResponse => {
				if (!jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.tracks.items.map(track => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri
				}));
			});
	},

	savePlaylist(playlistName, trackURIs) {
		if (!playlistName || !trackURIs.length) {
			return;
		}

		const token = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${token}` };
		let userID;

		return fetch('https://api.spotify.com/v1/me', { headers: headers })
			.then(response => response.json())
			.then(jsonResponse => {
				userID = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
					headers: headers,
					method: 'POST',
					body: JSON.stringify({ name: playlistName })
				})
					.then(response => response.json())
					.then(json => {
						const playlistID = json.id;
						return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
							headers: headers,
							method: 'POST',
							body: JSON.stringify({uris: trackURIs})
						})
					});
			});
	}
};

export default Spotify;
