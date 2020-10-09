import axios from 'axios';
import http from './httpCommon';

class LoginService 
{
    getByUsername(userName)
    {
        return http.get(`login/findUserByUsername/${userName}`);
    }

    getByPassword(password)
    {
        return http.get(`login/checkpassword/${password}`);
    }

    checkDetails(userName, password)
    {
        return this.getByUsername(userName) && this.getByPassword(password)
    }

    authenticateUser(data)
    {
        // return http.get(`login/authentication/${userName}/${password}`);

        // const newBooking = {
        //     customerId: "1",
        //     date: this.state.date + "@" + this.state.time + ":00.000+1000",
        //     serviceId: response["data"]["id"],
        //     employeeId: this.state.employeeId.split("#")[1]
        // }
        
        return axios({
            method: 'post',
            url: "http://localhost:8080/api/login/authenticate",
            data: data
        }).catch(e => {
            console.log(e);
        });
    }

    isLoggedIn()
    {
        return http.get(`login/loggedIn`);
    }

}
export default new LoginService();