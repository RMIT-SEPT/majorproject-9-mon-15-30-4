import http from "./httpCommon";

class EmployeeDataService {
    getByUserName(userName) {
        return http.get("/Employee/" + userName);
    }

}
export default new EmployeeDataService();