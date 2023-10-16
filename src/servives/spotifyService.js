import axios from "axios";

// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

// curl --request GET \
//   --url https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

// artist
// curl --request GET \
//   --url 'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?limit=10&offset=5' \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

// artists
// curl --request GET \
//   --url 'https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6' \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

// artist top track
// curl --request GET \
//   --url https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

const clientId = 'bab1ae6d076345aabfa85899f1a2deb8';
const clientSecret = 'a9d237a5aad546f793e4fa68d1ff5beb';

const getSpotifyToken = async () => {
    const options = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        data: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    };

    const result = await axios(options)
    const token = result.data.access_token

    // localStorage.setItem("token", JSON.stringify(token))

    return token
}

const getAlbum = async (token) => {
    const options = {
        url: "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    const album = await axios(options)

    return album.data
}

const getArtist = async (token, artistId) => {
    const options = {
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    let message = {}

    try {
        const artist = await axios(options)
        message.errorCode = 0
        message.data = artist.data
    }
    catch {
        message.errorCode = 1
        message.data = []
    }
    return message
}

const getSpotifyArtists = async (token, artistIds) => {
    const options = {
        url: `https://api.spotify.com/v1/artists?ids=${artistIds}`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    let message = {}

    try {
        const artistTopTracks = await axios(options)
        message.errorCode = 0
        message.data = artistTopTracks.data
    }
    catch {
        message.errorCode = 1
        message.data = []
    }
    return message
}

const getSpotifyArtistAlbums = async (token, artistId) => {
    const options = {
        url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    let message = {}

    try {
        const artists = await axios(options)
        message.errorCode = 0
        message.data = artists.data
    }
    catch {
        message.errorCode = 1
        message.data = []
    }
    return message
}

export {
    getSpotifyToken, getAlbum, getArtist, 
    getSpotifyArtists, getSpotifyArtistAlbums
}