import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://location:5000/api',
});

export default axiosInstance
