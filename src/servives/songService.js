import axios from 'axios'

const getAllSong = async () => {
    const data = await axios.get('http://localhost:8080/api/library/music')
    return data.data
}

export {
    getAllSong
}