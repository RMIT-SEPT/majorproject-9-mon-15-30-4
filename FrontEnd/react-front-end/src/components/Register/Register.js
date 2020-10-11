import React, { Component } from 'react';
import "./Register.css";
import registerService from "../../services/registerService.js";

import { Button, Form, Jumbotron } from "react-bootstrap";

class Register extends Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
            userName:"",
            password:"",
            name:"",
            contactEmail:"",
            contactNumber:""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState
        (
            {
                [e.target.name]: e.target.value
            }
        );
    }

    onSubmit(e)
    {
        e.preventDefault();
        /*
        * const newAccount is an intern 'struct', allowing us to access certain key properties
        */
        const newAccount =
        {
            userName: this.state.userName,
            password: this.state.password,
            name: this.state.name,
            contactEmail: this.state.contactEmail,
            contactNumber: this.state.contactNumber

        }

        console.log(newAccount);

        
        registerService.checkDetails(newAccount.userName, newAccount.password, newAccount.name, newAccount.contactEmail, newAccount.contactNumber)
            .then(response => {
                console.log(response);
                console.log(e);
                console.log();
            })
            .catch(e => {
                console.log(e);
                console.log();
            });
    }

 

    render() {
        return (

        <div className="containerRegister"> 
            <div className="form-popup">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Register</h5>
                    <hr />
                    <Jumbotron>
                    <Form onSubmit ={this.onSubmit}>

                    <Form.Group>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control 
                        type = "Text" 
                        placeholder = "Username"
                        name = "userName"
                        value = {this.state.userName}
                        onChange = {this.onChange}
                        />
                        <Form.Text>
                            Please enter your username
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control 
                            type = "password"
                            placeholder = "Password"
                            name = "password"
                            value = {this.state.password}
                            onChange = {this.onChange}
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Text id= "passwordHelpBlock" muted>
                            Enter a password between 5-300 characters long.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                            type = "text"
                            placeholder = "Name"
                            name = "name"
                            value = {this.state.name}
                            onChange = {this.onChange}
                        />
                        <Form.Text>
                            Enter a name for us to recognise you.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control 
                            type = "email"
                            placeholder = "Example@Email.com"
                            name = "contactEmail"
                            value = {this.state.contactEmail}
                            onChange = {this.onChange}
                        />
                        <Form.Text>
                            Enter an email address to recognise you.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Phone Number
                        </Form.Label>
                        <Form.Control 
                            type = "tel"
                            placeholder = "123456789"
                            name = "contactNumber"
                            value = {this.state.contactNumber}
                            onChange = {this.onChange}
                            
                        />
                        <Form.Text>
                            Please enter a contact number between 8-10 digits.
                        </Form.Text>
                    </Form.Group>

                    <Button type = "Submit"> Register</Button>

                    </Form>
                    </Jumbotron>

                   


                </div>
            </div>


        </div>
        )
    }
}


export default Register