import React, { Component } from 'react';
import "./Login.css";
import loginService from "../../services/loginService.js";
import LoginHeader from './LoginHeader';
import Header from "../Layout/Header";

class Login extends Component {
    isLoggedIn =false;
    constructor(props)
    {
        super(props);
        this.state= 
        {
            userName: "",
            password: "",
            loggedIn: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
        
    }

    onSubmit(e)
    {

        loginService.authenticateUser(this.state.userName, this.state.password)
            .then(response => {
  
                this.setState({
                    userName: response['data']['userName'],
                    loggedIn: true
                })
                Header.Login();
            })
            .catch( e => {
                console.log(e);
            })
            
    }

   
    render() {

        if(!this.state.loggedIn)
        {
            return (
                <div className = "form" >
                    <LoginHeader/>
                    <form onSubmit = {this.onSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="userName" name="userName" placeholder = "eg: buffman123" value = {this.state.userName} onChange = {this.onChange} autoComplete = "username"></input>
                        <br/>
                        <label htmlFor="password"> Password:</label>
                        <input type="password" id="password" name="password" placeholder = "Password" value = {this.state.password} onChange = {this.onChange} autoComplete = "current-password"></input>
                        <br/>
                        <input type="submit" value="Submit" className="btn btn-primary btn-block mt-4"></input>
                    </form>
                    
                </div>
    
            )
        }
        else
        {
            return (
                <div>Welcome, Login Successful</div>
            )
        }
        
    }

    
}
export default Login;