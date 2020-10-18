import axios from "axios";
import authHeader from "./secuirty/authHeader"
export default axios.create({
  baseURL: "http://localhost:8080/api/Home",
  headers: {
    "Content-type": "application/json",
    authHeader

  }
});
