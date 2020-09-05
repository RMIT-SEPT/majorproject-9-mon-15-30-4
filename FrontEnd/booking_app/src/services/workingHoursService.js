import http from "./httpCommon";

class WorkingHoursDataService {
    getAll() {
        return http.get("working_hours/all");
    }

    getById(id) {
        return http.get("working_hours/" + id);
    }
}
export default new WorkingHoursDataService();