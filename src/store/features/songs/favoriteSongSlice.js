import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavorSong } from "../../../servives/songService";

const initialState = {
    favoriteSongLoading: false,
    favoriteSong: []
}

export const getFavoriteSong = createAsyncThunk("favoriteSong/getFavoriteSong", async (userId) => {
    const response = await getFavorSong(userId)
    return response.songs
})

const favoriteSongSlice = createSlice({
    name: "favoriteSong",
    initialState,
    extraReducers: {
        [getFavoriteSong.pending]: (state, action) => {
            state.favoriteSongLoading = true;
        },
        [getFavoriteSong.fulfilled]: (state, action) => {
            state.favoriteSongLoading = false;
            state.favoriteSong = action.payload;
        },
        [getFavoriteSong.rejected]: (state, action) => {
            state.favoriteSongLoading = false;
        }
    }
})

export default favoriteSongSlice.reducer