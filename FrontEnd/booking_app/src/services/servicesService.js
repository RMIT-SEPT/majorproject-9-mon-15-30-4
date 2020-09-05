import http from "./httpCommon";

class ServiceDataService {
    getAll() {
        return http.get("/services/all");
    }

    getById(id) {
        return http.get("/services/" + id); // Placeholder
    }
}
export default new ServiceDataService();