import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSpotifyArtistAlbums } from '../../../servives/spotifyService'

const initialState = {
    tracks: {},
    loading: false
}
const spotifyToken = "BQBwiJSD201JfKw-SSuQVc-C82HTlx4VEpUVACx7bWnkdupug0_EKPHtzCwHXejNkuo77kWIU76zb9veizeo6jQK1Wvn_eon1w86HvX7vYHt1lX2RTU"

export const getArtistAlbums = createAsyncThunk("artistTopTracks/getArtistAlbums", async (artistId) => {
    const message = await getSpotifyArtistAlbums(spotifyToken, artistId)
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