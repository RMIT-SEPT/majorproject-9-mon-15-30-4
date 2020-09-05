import http from "./httpCommon";
import axios from "axios";

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
            data: data
        }).catch(e => {
            console.log(e);
        });
    }
}
export default new BookingDataService();