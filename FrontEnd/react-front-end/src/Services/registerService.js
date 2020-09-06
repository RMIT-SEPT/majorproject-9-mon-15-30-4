import http from "../http-common";

class RegisterService 
{
  
    getByUsername(userName)
    {
        return http.get(`register/findUserByUsername/${userName}`);
    }

    getByPassword(password)
    {
        return http.get(`register/checkpassword/${password}`);
    }

    getByName(name)
    {
        return http.get(`register/checkName/${name}`);
    }
    
    getByEmail(contactEmail)
    {
        return http.get(`register/checkContactEmail/${contactEmail}`);
    }

    getByNumber(contactNumber)
    {
        return http.get(`register/checkContactPhone/${contactNumber}`);
    }

    checkDetails(userName, password, name, contactEmail, contactNumber )
    {
        return this.getByUsername(userName) && this.getByPassword(password) && this.getByName(name) && this.getByEmail(contactEmail) && this.getByNumber(contactNumber)
    }

}
export default new RegisterService();