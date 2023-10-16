import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSpotifyToken } from "../../../servives/spotifyService";

const initialState = {
    loading: false,
    token: ""
}

export const getToken = createAsyncThunk("token/getToken", async () => {
    const token = await getSpotifyToken()
    return token
})

const tokenSlice = createSlice({
    name: "token",
    initialState,
    extraReducers: {
        [getToken.pending]: (state, action) => {
            state.loading = true
        },
        [getToken.fulfilled]: (state, action) => {
            state.loading = false
            state.token = action.payload
        },
        [getToken.rejected]: (state, action) => {
            state.loading = false
        }
    }
})

export default tokenSlice.reducer