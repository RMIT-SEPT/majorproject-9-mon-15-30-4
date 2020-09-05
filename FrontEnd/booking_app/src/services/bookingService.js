import http from "./httpCommon";

class BookingDataService {
    getAll() {
        return http.get("/bookings/all");
    }

    getByEmployee(id) {
        return http.get("/bookings/available/" + id);
    }

    create(data){
        return http.post("/bookings")
    }
}
export default new BookingDataService();