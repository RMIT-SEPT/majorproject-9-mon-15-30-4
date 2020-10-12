import React, { Component } from 'react'
import { Redirect } from "react-router";

class Logout extends Component 
{

    
    render() {

        if(localStorage.getItem('isLoggedIn') === "true")
        {
            localStorage.setItem('login', "NOT");
            localStorage.setItem('isLoggedIn', false);
            window.location.reload();
        }
        

        return (
            <div>
                You are now Logged Out Have a Nice Day :D
                <Redirect to="/Login"/>
            </div>
        )
    }
}
export default Logout;