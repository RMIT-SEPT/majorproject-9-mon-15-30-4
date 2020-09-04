import http from "./httpCommon";

class BookingDataService {
    getAll() {
        return http.get("/bookings/all");
    }

    create(data){
        return http.get("/bookings")
    }
}
export default new BookingDataService();