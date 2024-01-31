import axios from '../configs/axios'

const getAllSong = async () => {
    const data = await axios.get('/library/music')
    return data.data
}

export {
    getAllSong
}