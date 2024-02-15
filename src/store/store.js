import { configureStore } from '@reduxjs/toolkit'
import songReducer from './features/songs/songSlice'
import currentSongReducer from './features/songs/currentSongSlice'
import artistReducer from './features/artists/artistSlice'
import artistAlbumsReducer from './features/artistAlbums/artistAlbumsSlice'
import actionReducer from './features/action/actionSlice'
import playlistReducer from './features/playlist/playlistSlice'
import userReducer from './features/user/userSlice'
import favoriteSongReducer from './features/songs/favoriteSongSlice'

export default configureStore({
  reducer: {
    songs: songReducer,
    currentSong: currentSongReducer,
    favoriteSong: favoriteSongReducer,
    actions: actionReducer,
    artists: artistReducer,
    artistAlbums: artistAlbumsReducer,
    playlist: playlistReducer,
    user: userReducer,
  }
})