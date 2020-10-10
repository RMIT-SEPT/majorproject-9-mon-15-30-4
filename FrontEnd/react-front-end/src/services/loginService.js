import axios from 'axios';
import http from './httpCommon';
import {authHeader} from '../security/authHeader'
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

}
export default new LoginService();