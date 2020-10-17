import http from "./httpCommon";
import axios from "axios";
import { authHeader } from "../security/authHeader";

class BookingDataService {
    getAll() {
        return http.get("/bookings/all");
    }

    getByEmployee(id) {
        return http.get("/bookings/available/" + id);
    }

    create(data){
        axios({
            method: 'post',
            url: "http://localhost:8080/api/bookings",
            data: data,
            headers: authHeader
        }).catch(e => {
            console.log(e);
        });
    }

    checkAvailable(date, serviceId, employeeId) {
        return http.get("/bookings/available/time/" + date +
            "/" + serviceId + "/" + employeeId);
    }

}
//Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjIiwiZXhwIjoxNjAyNjgzMDg5LCJpYXQiOjE2MDI2Njg2ODl9.XJTLJoFimnO45bKQ9diLEyXWrEy1Jwci4c9sW3It8Lc
//Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjIiwiZXhwIjoxNjAyNjgzNjQwLCJpYXQiOjE2MDI2NjkyNDB9.75df0T6TGkILbMpICzXTpjnePEp63s7QVkO7Cb6Yy6o
export default new BookingDataService();