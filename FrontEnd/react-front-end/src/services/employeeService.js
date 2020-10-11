import http from "./httpCommon";
import axios from "axios";
import {authHeader} from "../security/authHeader";

class EmployeeDataService {
    getByToken(){
        return http.get("/Employee/token/" + localStorage.getItem('login').toString().split("Bearer ")[1]);
    }

    getByUserName(userName) {
        return http.get("/Employee/" + userName);
    }

    getAllEmployees()
    {
        return http.get("/Employee/AllEmployees");
    }
}
export default new EmployeeDataService();