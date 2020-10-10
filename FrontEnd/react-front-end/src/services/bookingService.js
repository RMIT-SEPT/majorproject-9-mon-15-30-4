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
export default new BookingDataService();