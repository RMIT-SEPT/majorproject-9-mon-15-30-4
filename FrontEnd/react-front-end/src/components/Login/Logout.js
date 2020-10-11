import React, { Component } from 'react'

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
            </div>
        )
    }
}
export default Logout;