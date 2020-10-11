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

    isCustomer()
    {
        return http.get(`login/isCustomer/${localStorage.getItem('login')}`)
    }

    isEmployee()
    {
        return http.get(`login/isEmployee/${localStorage.getItem('login')}`)
    }
    
    isAdmin()
    {
        return http.get(`login/isAdmin/${localStorage.getItem('login')}`)
    }

}
export default new LoginService();