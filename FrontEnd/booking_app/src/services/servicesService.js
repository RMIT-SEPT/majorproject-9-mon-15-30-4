import http from "./httpCommon";

class ServiceDataService {
    getAll() {
        return http.get("/services/all");
    }
}
export default new ServiceDataService();