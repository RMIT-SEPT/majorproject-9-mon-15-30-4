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

    authenticateUser(userName, password)
    {
        return http.get(`login/authentication/${userName}/${password}`);
    }

    isLoggedIn()
    {
        return http.get(`login/loggedIn`);
    }

}
export default new LoginService();