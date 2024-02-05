import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylist } from "../../../servives/playlistService";

const initialState = {
    playlist: [],
    playlistLoading: false
}

export const getPlaylists = createAsyncThunk("playlists/getplaylists", async (Id)=>{
    const playlist = await getPlaylist(Id)
    return playlist
})

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    extraReducers: {
        [getPlaylists.pending]: (state, action) => {
            state.playlistLoading = true;
        },
        [getPlaylists.fulfilled]: (state, action) => {
            state.playlistLoading = false;
            state.playlist = action.payload.playlist;
        },
        [getPlaylists.rejected]: (state, action) => {
            state.playlistLoading = false;
        }
    }
})

export default playlistSlice.reducer