import axios from "axios";

// ESTABLISH instance-based http notation, reduce amount of repeated contents.
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `${localStorage.getItem('login')}`
    }
});