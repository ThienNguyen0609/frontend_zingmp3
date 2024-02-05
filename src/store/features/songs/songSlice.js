import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../configs/axios'

const initialState = {
    songs: [],
    loading: false
}

export const getSongs = createAsyncThunk("songs/getSongs", async ()=>{
    const response = await axios.get("/library/music")
    return response.songs
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