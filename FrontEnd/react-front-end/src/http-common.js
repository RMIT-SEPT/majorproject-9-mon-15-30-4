import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api/Home",
  headers: {
    "Content-type": "application/json"
  }
});