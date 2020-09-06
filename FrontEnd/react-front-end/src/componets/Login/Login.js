import React, { Component } from 'react';
import "./Login.css";
import loginService from "../../Services/loginService.js";

class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state= 
        {
            "userName": "",
            "password": ""
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
        e.preventDefault();
        const newLogin =
        {
            userName: this.state.userName,
            password: this.state.password
        }
        console.log(newLogin);
        loginService.checkDetails(newLogin.userName, newLogin.password)
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div className = "form">
                <form onSubmit = {this.onSubmit}>
                    <label for="username">Username:</label>
                    <input type="text" id="userName" name="userName" placeholder = "eg: buffman123" value = {this.state.userName} onChange = {this.onChange} ></input>
                    <br></br>
                    <label for="password">Password:  </label>
                    <input type="password" id="password" name="password" value = {this.state.password} onChange = {this.onChange} ></input>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                </form>
                
            </div>

            

        )

        
    }

    
}
export default Login;