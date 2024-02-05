import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getService } from '../../../servives/userService'

const initialState = {
  userLoading: false,
  user: {}
}

export const getUser = createAsyncThunk("user/getUser", async (userId) => {
  const response = await getService(userId)
  return response.user
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getUser.pending]: (state, action) => {
        state.userLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
    },
    [getUser.rejected]: (state, action) => {
        state.userLoading = false;
    }
  }
})

// // Action creators are generated for each case reducer function
// export const { setUser } = userSlice.actions

export default userSlice.reducer