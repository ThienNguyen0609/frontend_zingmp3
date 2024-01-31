import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    myPlaylist: [],
    loading: false
}

export const getMyPlaylist = createAsyncThunk("myPlaylist/getMyplaylist", async (Id)=>{
    const myPlaylist = await axios.get(`http://localhost:8080/api/myPlaylist/${Id}`);
    return myPlaylist.data
})

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    extraReducers: {
        [getMyPlaylist.pending]: (state, action) => {
            state.loading = true;
        },
        [getMyPlaylist.fulfilled]: (state, action) => {
            state.loading = false;
            state.myPlaylist = action.payload;
        },
        [getMyPlaylist.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

export default playlistSlice.reducer