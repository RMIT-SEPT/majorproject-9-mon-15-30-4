import axios from 'axios';
import http from './httpCommon';

//COMMUNICATES with the BACKEND via LoggingInController
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
    //FOR SECURITY PURPOSES
    authenticateUser(data)
    {
   
        return axios({
            method: 'post',
            url: "http://localhost:8080/api/login/authenticate",
            data: data,
            dataType: "json",
            contentType:  "application/json"
        }).catch(e => {
            console.log(e);
        });
    }

    isLoggedIn()
    {
        return http.get(`login/loggedIn`);
    }

    isCustomer()
    {
        return http.get(`login/isCustomer/${localStorage.getItem('login').split("Bearer ")[1]}`)
    }

    isEmployee()
    {
        return http.get(`login/isEmployee/${localStorage.getItem('login').split("Bearer ")[1]}`)
    }
    
    isAdmin()
    {
        return http.get(`login/isAdmin/${localStorage.getItem('login').split("Bearer ")[1]}`)
    }

}
export default new LoginService();