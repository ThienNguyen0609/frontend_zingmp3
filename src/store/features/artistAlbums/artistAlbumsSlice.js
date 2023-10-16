import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSpotifyArtistAlbums } from '../../../servives/spotifyService'

const initialState = {
    tracks: {},
    loading: false
}
const spotifyToken = "BQBTwjgRnFm6vPBKGlfkS5dX-CGS1oYlmFwWfwnKW833hR5f5XDVyXqNNnjRO6zSHgLfSTM-F_dkKKB0YGg_5y60KBv7uG5ORXi5DABPNyyo-Wq7JZI"

export const getArtistAlbums = createAsyncThunk("artistTopTracks/getArtistAlbums", async (artistId) => {
    const message = await getSpotifyArtistAlbums(spotifyToken, artistId)
    console.log(message.data)
    return message.data
})

const artistAlbumsSlice = createSlice({
    name: "artistTopTracks",
    initialState,
    extraReducers: {
        [getArtistAlbums.pending]: (state, action) => {
            state.loading = true;
        },
        [getArtistAlbums.fulfilled]: (state, action) => {
            state.loading = false;
            state.tracks = action.payload;
        },
        [getArtistAlbums.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

export default artistAlbumsSlice.reducer