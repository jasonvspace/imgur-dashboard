import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_IMGUR_ENDPOINT,
  headers:{
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;