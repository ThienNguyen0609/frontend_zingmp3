import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSong: {},
  artistId: ""
}

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload
    },
    setArtistId: (state, action) => {
      state.artistId = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSong, setArtistId } = actionSlice.actions

export default actionSlice.reducer