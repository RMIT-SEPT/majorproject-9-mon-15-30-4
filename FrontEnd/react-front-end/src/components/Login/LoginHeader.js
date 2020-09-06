import React, { Component } from 'react'

 class LoginHeader extends Component {
    loggedIn = false;

    login()
    {
        this.loggedIn = true;
    }

    logout()
    {
        this.loggedIn = false;
    }
    render() {
        if(this.loggedIn)
        {
            return (
                <div>
                    <label> Already Logged In what are you doing here</label>
                </div>
            )
        }
        else{
            return (
                <div>
                    <label> Welcome Please Login NOW</label>
                    <br/>
                </div>
            )
        }
        
    }
}
export default LoginHeader;

