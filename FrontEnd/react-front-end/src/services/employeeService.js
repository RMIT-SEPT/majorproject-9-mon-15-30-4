import http from "./httpCommon";

class EmployeeDataService {
    getByUserName(userName) {
        return http.get("/Employee/" + userName);
    }

    getAllEmployees()
    {
        return http.get("/Employee/AllEmployees");
    }
}


export default new EmployeeDataService();