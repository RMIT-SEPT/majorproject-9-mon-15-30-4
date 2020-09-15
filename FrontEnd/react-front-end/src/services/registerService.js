
import Axios from "axios";

class RegisterService 
{
    
    //++OUT-GOING METHODS
    getByUsername(userName,password, name, contactEmail, contactNumber)
    {
        // return http.get(`register/findUserByName/${userName}/${password}/${name}/${contactEmail}/${contactNumber}`);
        return Axios.get(`http://localhost:8080/api/register/findUserByName/${userName}/${password}/${name}/${contactEmail}/${contactNumber}`);
    }




    //++INCOMING METHODS
    /*
        * Register.js ( onSubmit(e) will call checkDetails(...). This.getByUsername will send the key components into the method above )
    */

    checkDetails(userName, password, name, contactEmail, contactNumber)
    {
        return this.getByUsername(userName, password, name, contactEmail, contactNumber);
    }

}
export default new RegisterService();