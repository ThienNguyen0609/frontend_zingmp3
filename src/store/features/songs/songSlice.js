import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    songs: [],
    loading: false
}

export const getSongs = createAsyncThunk("songs/getSongs", async ()=>{
    const songs = await axios.get("http://localhost:8080/api/library/music")
    return songs.data
})

const songSlice = createSlice({
    name: "song",
    initialState,
    extraReducers: {
        [getSongs.pending]: (state, action) => {
            state.loading = true;
        },
        [getSongs.fulfilled]: (state, action) => {
            state.loading = false;
            state.songs = action.payload;
        },
        [getSongs.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

export default songSlice.reducer