import axios from '../configs/axios'

const getAllSong = async () => {
    const response = await axios.get('/song')
    return response
}

const getSong = async (userId) => {
    const response = await axios.get(`/song/current/get/${userId}`)
    return response
}

export {
    getAllSong, getSong
}