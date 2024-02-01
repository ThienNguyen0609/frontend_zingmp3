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

const logoutService = (id) => {
    return axios.post('/user/logout', {userId: id})
}

const authorityService = (songId, userId) => {
    return axios.post('/user/permission', {songId: songId, userId: userId})
}

const getService = (userId) => {
    return axios.get(`/user/get/${userId}`)
}

const updateService = (user, userId) => {
    return axios.put('/user/update', {user: user, userId: userId})
}

export {
    getService,
    updateService,
    registerService, 
    loginService, 
    logoutService,
    authenticateService, 
    authorityService
}