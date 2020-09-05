import http from "./httpCommon";

class ServiceDataService {
    getAll() {
        return http.get("/services/all");
    }

    getById(id) {
        return http.get("/services/" + id); // Placeholder
    }

    getByName(name) {
        return http.get("/services/name/" + name);
    }

    getByEmployeeAndName(id, name) {
        return http.get("/services/fetch/" + id + "/" +name);
    }

}
export default new ServiceDataService();