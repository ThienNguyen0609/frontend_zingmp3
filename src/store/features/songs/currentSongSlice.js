import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSong } from '../../../servives/songService'

const initialState = {
    currentSong: {},
    currentSongLoading: false
}

export const getCurrentSong = createAsyncThunk("currentSong/getCurrentSong", async (userId) => {
    const response = await getSong(userId)
    return response.song
})

const currentSongSlice = createSlice({
    name: "currentSong",
    initialState,
    extraReducers: {
        [getCurrentSong.pending]: (state, action) => {
            state.currentSongLoading = true;
        },
        [getCurrentSong.fulfilled]: (state, action) => {
            state.currentSongLoading = false;
            state.currentSong = action.payload;
        },
        [getCurrentSong.rejected]: (state, action) => {
            state.currentSongLoading = false;
        }
    }
})

export default currentSongSlice.reducer