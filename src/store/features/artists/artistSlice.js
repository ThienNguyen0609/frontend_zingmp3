import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../configs/axios'

const initialState = {
    artists: [],
    loading: false
}

export const getArtists = createAsyncThunk("artists/getArtists", async () => {
    const data = await axios.get("/artist")
    return data.data
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