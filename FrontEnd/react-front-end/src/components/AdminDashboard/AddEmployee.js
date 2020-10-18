import React, { Component } from 'react';
import registerService from "../../services/registerService.js";

import { Container, Form, Button, Jumbotron } from "react-bootstrap";

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            userName: "",
            password: "",
            name: "",
            employeePhone: "",
            employeeEmail: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState
            (
                {
                    [e.target.name]: e.target.value
                }
            );
    }

    onSubmit(e) {
        e.preventDefault();
        /*
        * const newAccount is an intern 'struct', allowing us to access certain key properties
        */
        const newAccount =
        {
            userName: this.state.userName,
            password: this.state.password,
            name: this.state.name,
            employeeEmail: this.state.employeeEmail,
            employeePhone: this.state.employeePhone

        }
        
        //IF the details are entered, then SUBMIT information into the backend
        registerService.checkEmployeeDetails(newAccount.userName, newAccount.password, newAccount.name, newAccount.employeeEmail, newAccount.employeePhone)
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

    //SHOW form for employee-entry.
    render() {
        return (
            <div className="container-fluid">
                <Container className="ContainerAddEmployee">
                    <h1 className="display-5 text-center">Add New Employee</h1>

                    <Jumbotron>
                        <Form onSubmit={this.onSubmit}>

                            <Form.Group fluid>
                                <Form.Label>
                                    Username
                    </Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="Username"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.onChange}
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
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    aria-describedby="passwordHelpBlock"
                                />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Enter a password between 5-300 characters long.
                    </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Name
                    </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
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
                                    type="email"
                                    placeholder="Example@Email.com"
                                    name="employeeEmail"
                                    value={this.state.employeeEmail}
                                    onChange={this.onChange}
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
                                    type="tel"
                                    placeholder="12345679"
                                    name="employeePhone"
                                    value={this.state.employeePhone}
                                    onChange={this.onChange}

                                />
                                <Form.Text>
                                    Please enter a contact number between 8-10 digits.
                    </Form.Text>
                            </Form.Group>

                            <Button type="Submit" block> Add Employee </Button>
                        </Form>
                    </Jumbotron>


                </Container>

            </div>
        )
    }
}
export default AddEmployee;