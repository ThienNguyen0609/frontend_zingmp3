import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSpotifyArtists } from '../../../servives/spotifyService'

const initialState = {
    artists: {},
    loading: false
}
const artistSpotifyId = [
    "7vk5e3vY1uw9plTHJAMwjN",
    "0C8ZW7ezQVs4URX5aX7Kqx",
    "6VuMaDnrHyPL1p4EHjYLi7",
    "7n2wHs1TKAczGzO7Dd2rGr",
    "06HL4z0CvFAxyc27GXpf02",
    "1uNFoZAHBGtllmzznpCI3s",
    "5dfZ5uSmzR7VQK0udbAVpf",
    "04gDigrS5kc9YWfZHwBETP",
    "66CXWjxzNUsdJxJ2JdwvnR",
    "5WUlDfRSoLAfcVSX1WnrxN",
    "1HY2Jd0NmPuamShAr6KMms",
    "69GGBxA162lTqCwzJG5jLp",
    "6eUKZXaKkcviH0Ku9w2n3V",
    "4nDoRrQiYLoBzwC5BhVJzF"
]
const spotifyToken = "BQBTwjgRnFm6vPBKGlfkS5dX-CGS1oYlmFwWfwnKW833hR5f5XDVyXqNNnjRO6zSHgLfSTM-F_dkKKB0YGg_5y60KBv7uG5ORXi5DABPNyyo-Wq7JZI"

export const getArtists = createAsyncThunk("artists/getArtists", async () => {
    const artistIds = artistSpotifyId.join("%2C")
    const message = await getSpotifyArtists(spotifyToken, artistIds)
    return message.data
})

const artistSlice = createSlice({
    name: "artist",
    initialState,
    extraReducers: {
        [getArtists.pending]: (state, action) => {
            state.loading = true;
        },
        [getArtists.fulfilled]: (state, action) => {
            state.loading = false;
            state.artists = action.payload;
        },
        [getArtists.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

export default artistSlice.reducer