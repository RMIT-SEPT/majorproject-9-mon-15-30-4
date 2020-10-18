import http from "./httpCommon";
import axios from "axios";
import { authHeader } from "../security/authHeader";

//COMMUNICATES WITH THE BACKEND, VIA ServiceController
    //RETRIEVES SPECIFIC INFORMATION, DEPENDING ON THE SITUATION + REQUEST
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

    getByEmployeeId(id)
    {
        return http.get("/services/employee/" + id);
    }

    create(data){
        axios({
            method: 'post',
            url: "http://localhost:8080/api/services",
            data: data,
            headers: authHeader
        }).catch(e => {
            console.log(e);
        });
    }

    delete(employeeId, name)
    {
        http.delete(`/services/delete/${employeeId}/${name}`); 
    }
}
export default new ServiceDataService();