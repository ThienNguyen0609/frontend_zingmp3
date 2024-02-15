import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSong: {},
  currentList: [],
  favoriteSongIds: [],
}

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload
    },
    setCurrentList: (state, action) => {
      state.currentList = action.payload
    },
    setFavoriteSongIds: (state, action) => {
      state.favoriteSongIds = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSong, setCurrentList, setFavoriteSongIds } = actionSlice.actions

export default actionSlice.reducer