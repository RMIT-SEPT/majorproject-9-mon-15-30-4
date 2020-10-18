import http from "./httpCommon";


class EmployeeDataService {
    // GET EMPLOYEE TOKEN FOR SECURITY PURPOSES; VIA EMPLOYEE CONTROLLER IN THE BACKEND
    getByToken(){
        return http.get("/Employee/token/" + localStorage.getItem('login').toString().split("Bearer ")[1]);
    }

    //GET EMPLOYEE VIA USERNAME, VIA EMPLOYEE CONTROLLER IN THE BACKEND
    getByUserName(userName) {
        return http.get("/Employee/" + userName);
    }
    //GET ALL EMPLOYEES, VIA EMPLYOEE CONTROLLER IN THE BACKEND
    getAllEmployees()
    {
        return http.get("/Employee/AllEmployees");
    }
}
export default new EmployeeDataService();