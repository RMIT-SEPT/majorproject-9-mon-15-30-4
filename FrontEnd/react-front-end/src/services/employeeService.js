import http from "./httpCommon";

class EmployeeDataService {
    getByUserName(userName) {
        return http.get("/Employee/" + userName);
    }

    get

}
export default new EmployeeDataService();