import axios from "../configs/axios";

const getPlaylist = async (userId) => {
    const data = await axios.get(`/myPlaylist/get/${userId}`)
    return data
}

const addSongToPlaylist = async (userId, songId) => {
    const request = {
        userId: userId,
        songId: songId
    }
    const data = await axios.post('/myPlaylist/add', request)
    return data
}
const removeFromPlaylist = async (userId, songId) => {
    const request = {
        userId: userId,
        songId: songId
    }
    const data = await axios.post('/myPlaylist/remove', request)
    return data
}

export {
    getPlaylist, addSongToPlaylist, removeFromPlaylist
}