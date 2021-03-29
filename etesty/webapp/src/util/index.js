import axios from 'axios';

const apiAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export {apiAxios};