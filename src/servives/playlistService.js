import axios from "../configs/axios";

const createPlaylist = async (namePlaylist, userId) => {
    const data = await axios.post('/playlist/create', {namePlaylist:namePlaylist, userId: userId})
    return data
}

const deletePlaylist = async (userId, playlistId) => {
    const data = await axios.post('/playlist/delete', {userId: userId, playlistId: playlistId})
    return data
}

const getPlaylist = async (userId) => {
    const data = await axios.get(`/playlist/get/${userId}`)
    return data
}

const getPlaylistSong = async (playlistId, userId) => {
    const data = await axios.get(`/playlist/get/item/${playlistId}/${userId}`)
    return data
}

const addSongToPlaylist = async (playlistId, songId) => {
    const request = {
        playlistId: playlistId,
        songId: songId
    }
    const data = await axios.post('/playlist/add', request)
    return data
}
const removeSongFromPlaylist = async (playlistId, songId) => {
    const request = {
        playlistId: playlistId,
        songId: songId
    }
    const data = await axios.post('/playlist/remove', request)
    return data
}

export {
    createPlaylist, deletePlaylist, getPlaylistSong,
    getPlaylist, addSongToPlaylist, removeSongFromPlaylist
}