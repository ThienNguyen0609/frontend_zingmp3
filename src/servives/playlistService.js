import axios from "../configs/axios";

const addSongToPlaylist = async (userId, songId) => {
    const data = await axios.post(`/myPlaylist/${userId}/${songId}/add`)
    return data
}
const removeFromPlaylist = async (userId, songId) => {
    const data = await axios.post(`/myPlaylist/${userId}/${songId}/remove`)
    return data
}

export {
    addSongToPlaylist, removeFromPlaylist
}