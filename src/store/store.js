import { configureStore } from '@reduxjs/toolkit'
import songReducer from './features/songs/songSlice'
import artistReducer from './features/artists/artistSlice'
import artistAlbumsReducer from './features/artistAlbums/artistAlbumsSlice'
import actionReducer from './features/action/actionSlice'
import tokenReducer from './features/token/tokenSlice'

export default configureStore({
  reducer: {
    songs: songReducer,
    actions: actionReducer,
    artists: artistReducer,
    artistAlbums: artistAlbumsReducer,
    token: tokenReducer
  }
})