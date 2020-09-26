import React, { Component } from 'react';
import "./Login.css";
import loginService from "../../services/loginService.js";
import Header from "../Layout/Header";

import { Form, Container, Button, Jumbotron, Nav } from "react-bootstrap";

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
            return(
                <div>
                    <Container fluid = "md">
             
                        <Jumbotron className ="text-auto">
                        
                        <h1> Welcome!</h1>
                        <p>
                            Enter your details to log in.
                        </p>


                      
 
                        <Form onSubmit = {this.onSubmit}>
                            <Form.Group controlId = "formEmail">
                                <Form.Label>
                                    Email Address
                                </Form.Label>
                                <Form.Control type = "email" placeholder = "Example@Email.com"/>
                                <Form.Text>
                                   Please enter your email.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId = "formPassword">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control type ="password" placeholder = "Password" />

                            </Form.Group>

                            <Nav className = "ml-auto">
                               <Button variant ="secondary" type ="submit"> Login</Button> 
                            </Nav>
                            
                        </Form>

                          </Jumbotron>

                    </Container>
 
                </div>
            )
        }
        else
        {
            return(
       
                <div>Welcome. Login Successful.</div>
  
            )
            
        }
        
    }

    
}
export default Login;