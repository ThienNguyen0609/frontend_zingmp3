import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSong: {},
  currentList: []
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSong, setCurrentList } = actionSlice.actions

export default actionSlice.reducer