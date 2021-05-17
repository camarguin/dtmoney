import axios from 'axios';

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
    // baseURL: 'https://dtmoneylgc.netlify.app/api'
})