import axios from "axios"
const axiosInstance = axios.create({
  baseURL: 'http://103.134.26.92:3010',

});

export default axiosInstance