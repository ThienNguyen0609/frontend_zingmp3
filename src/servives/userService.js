import axios from '../configs/axios'

const authenticateService = (id) => {
    return axios.post('/user/authenticated', {userId: id})
}

const registerService = (user) => {
    return axios.post('/user/register', user)
}

const loginService = (user) => {
    return axios.post('/user/login', user)
}

const authorityService = (songId, userId) => {
    return axios.post('/user/permission', {songId: songId, userId: userId})
}

export {
    registerService, loginService, authenticateService, authorityService
}