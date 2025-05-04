import axios from "axios";

const ApiInstance = axios.create({
    baseURL: 'https://student-portal-backend-nine.vercel.app',
})

export default ApiInstance;