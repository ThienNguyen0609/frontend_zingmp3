import axios from '../configs/axios'

const getAllSong = async () => {
    const response = await axios.get('/song')
    return response
}

const getSong = async (userId) => {
    const response = await axios.get(`/song/current/get/${userId}`)
    return response
}

const getFavorSong = async (userId) => {
    const response = await axios.get(`/song/favorite/get/${userId}`)
    return response
}

const addSongToLib = async (song) => {
    const response = await axios.post('/song/library/addtolib', {song: song})
    return response
}

const updateFavorSong = async (userId, favorSongIds) => {
    const response = await axios.post('/song/favorite/update', {userId: userId, favorSongIds: favorSongIds})
    return response
}

export {
    getAllSong, getSong, getFavorSong, addSongToLib, updateFavorSong
}