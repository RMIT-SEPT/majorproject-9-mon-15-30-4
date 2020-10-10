import http from "./httpCommon";
import axios from "axios";
import { authHeader } from "../security/authHeader";
class WorkingHoursDataService {
    getAll() {
        return http.get("working_hours/all");
    }

    getById(id) {
        return http.get("working_hours/" + id);
    }

    deleteById(id){
        return http.delete("working_hours/" + id);
    }

    saveHours(data){
        console.log(data);
        return axios({
            method: 'put',
            url: "http://localhost:8080/api/working_hours/",
            data: data,
            headers: authHeader
        }).catch(e => {
            console.log(e);
        });
    }
}
export default new WorkingHoursDataService();