import http from "./httpCommon";

class CustomerDataService
{
    getByToken()
    {
        return http.get("/Customer/token/" + localStorage.getItem('login').toString().split("Bearer ")[1]);
    }

    getByUserName(userName)
    {
        return http.get("/Customer/"+ userName);
    }

    getAllCustomers()
    {
        return http.get("/Customer/AllCustomers");
    }
}

export default new CustomerDataService();