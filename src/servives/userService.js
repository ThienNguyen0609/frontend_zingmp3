import axios from 'axios'

const registerService = (user) => {
    return axios.post('http://localhost:8080/api/users/register', user)
}

const loginService = (user) => {
    return axios.post('http://localhost:8080/api/users/login', user)
}

const getUserService = () => {
    return axios.get('http://localhost:8080/api/users')
}

export {
    registerService, loginService,
    getUserService
}