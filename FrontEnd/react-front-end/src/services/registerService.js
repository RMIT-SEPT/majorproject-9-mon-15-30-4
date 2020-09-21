
import Axios from "axios";

class RegisterService 
{
    
    //++OUT-GOING METHODS -- CREATES a customer
    getByUsername(userName,password, name, contactEmail, contactNumber)
    {
  
        return Axios.get(`http://localhost:8080/api/register/findUserByName/${userName}/${password}/${name}/${contactEmail}/${contactNumber}`);
    }

    getByEmployeeUserName(userName, password, name, employeeEmail, employeePhone)
    {
        return Axios.get(`http://localhost:8080/api/register/findEmployeeByUsername/${userName}/${password}/${name}/${employeeEmail}/${employeePhone}`);
    }


    //++INCOMING METHODS
    /*
        * Register.js ( onSubmit(e) will call checkDetails(...). This.getByUsername will send the key components into the method above )
    */

    checkDetails(userName, password, name, contactEmail, contactNumber)
    {
        return this.getByUsername(userName, password, name, contactEmail, contactNumber);
    }

    checkEmployeeDetails(userName, password, name, employeeEmail, employeePhone)
    {
        return this.getByEmployeeUserName(userName, password, name, employeeEmail, employeePhone);
    }

}
export default new RegisterService();