import http from "./httpCommon";

class CustomerDataService
{
    // GET CUSTOMER TOKEN, VIA CONTACTING DATABASE CUSTOMER CONTROLLER
    getByToken()
    {
        return http.get("/Customer/token/" + localStorage.getItem('login').toString().split("Bearer ")[1]);
    }
    // GET CUSTOMER BY USERNAME, VIA CONTACTING DATABASE CUSTOMER CONTROLLER
    getByUserName(userName)
    {
        return http.get("/Customer/"+ userName);
    }
    // GET ALL THE CUSTOMERS BY USERNAME, VIA CONTACTING DATABASE CUSTOMER CONTROLLER
    getAllCustomers()
    {
        return http.get("/Customer/AllCustomers");
    }
}

export default new CustomerDataService();