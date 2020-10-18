import React, { Component } from 'react';
import "./Login.css";
import loginService from "../../services/loginService.js";
import { Redirect } from "react-router";
import { Form, Container, Button, Jumbotron, Nav } from "react-bootstrap";

class Login extends Component {
    isLoggedIn = false;
    constructor(props) {
        super(props);
        this.state =
        {
            username: "",
            password: "",
            loggedIn: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        console.log("loggedIn component is: " + this.setState.loggedIn);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    // WHEN USER PRESSES "SUBMIT" ON THE LOG IN PAGE, CHECK DATABASE AND VALIDATE TOKEN.
        // LOG IN THE USER
    onSubmit(e) {
        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        }
        //CALL BACK END, IF RESPONSE FROM BACKEND, UPDATE CURRENT LOG IN IINFORMATION
        loginService.authenticateUser(loginRequest)
            .then(response => {
                localStorage.setItem('login', response['data'].jwt);
                localStorage.setItem('isLoggedIn', true)
                this.setState({ loggedIn: true });

                this.forceUpdate();

            })
            .catch(e => {
                console.log(e);
            })


    }


    render() {
        // IF USER IS NOT LOGGED IN, SHOW LOG IN PAGE
        if (localStorage.getItem('isLoggedIn') !== "true") {
            return (
                <div>
                    <Container fluid="md" className="ContainerLogin">
                        {/* TEXT COMPONENT */}
                        <h5 className="display-4 text-center">Welcome Back!</h5>
                        <hr />
                        <Jumbotron className="text-auto">
                            {/* HEADER AND TEXT */}
                            <h1> Welcome!</h1>
                            <p>
                                Please enter your details to log in.
                            </p>

                            {/* LOG IN FORM */}
                            <Form onSubmit={this.onSubmit}>
                                {/* USER NAME COMPONENT */}
                                <Form.Group controlId="username">
                                    <Form.Label>
                                        Username
                                    </Form.Label>

                                    <Form.Control type="text" placeholder="Please enter your username" name="username" value={this.state.username} onChange={this.onChange} />
                                    <Form.Text>
                                        Please enter your username.
                                    </Form.Text>
                                </Form.Group>
                                {/* PASSWORD COMPONENT */}
                                <Form.Group controlId="password">
                                    <Form.Label>
                                        Password
                                    </Form.Label>
                                    <Form.Control type="password" placeholder="Please enter your password" name="password" value={this.state.password} onChange={this.onChange} />
                                </Form.Group>
                                {/* BUTTONGS */}
                                <Nav className="ml-auto">
                                    <Button variant="secondary" type="submit"> Login</Button>
                                </Nav>



                            </Form>

                        </Jumbotron>

                    </Container>

                </div>
            )
        }
        // IF USER IS LOGGED IN, REDIRECT THEM TO THEIR SPECIFIC DASHBOARD
        else if (localStorage.getItem('isLoggedIn') === "true") {
            return (
                <div>
                    <Redirect to="/Dashboard" />
                </div>
            )

        }

    }


}
export default Login;