import axios from "axios";
import authHeader from "./secuirty/authHeader"
export default axios.create({
  baseURL: "http://localhost:8080/api/Home",
  headers: {
    "Content-type": "application/json",
    "Authorization": `${localStorage.getItem('login')}`

  }
});


// const apiUrl = 'http://localhost:8080/api';
// axios.interceptors.request.use(
//   config => {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = [apiUrl];
//     const token = localStorage.getItem('token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }


// );