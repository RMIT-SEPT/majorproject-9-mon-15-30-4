import React, { Component } from 'react';
import "./Dashboard.css";
import HoursButton from "../Employee/hoursButton";
import loginService from "../../services/loginService.js";

import { BrowserRouter as Router, Redirect } from "react-router-dom"


class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
            isAdmin: false,
            isEmployee: false,
            isCustomer: false,
            employeeId: "",
            username: "",
            password: "",
        };
        //Checks if logged in

        this.checkAccountType(this);
    }

    setIsAdmin() {
        this.setState({
            isAdmin: true
        });
    };

    setIsEmployee() {
        this.setState({
            isEmployee: true
        });
    };

    setIsCustomer() {
        this.setState({
            isCustomer: true
        });
    };



    checkAccountType() {
        // console.log("In checkAccountType()!!");
        if (localStorage.getItem('isLoggedIn') === "true") {
            //CHECK if type of account isAdmin
            // console.log("Check if is admin!");
            loginService.isAdmin()
                .then(
                    response => {
                        if (response['data'] === true) {
                            console.log(response);
                            this.setIsAdmin();
                        }

                    }
                )
                .catch(e => {
                    console.log(e);
                    console.log();
                }
                );
            //CHECK if type of account isEmployee

            loginService.isEmployee()
                .then(response => {
                    console.log(response);
                    if (response['data'] === true) {

                        this.setIsEmployee();
                    }

                }
                )
                .catch(e => {
                    console.log(e);
                    console.log();
                }
                );

            //Check if type of Account isCustomer

            loginService.isCustomer()
                .then(response => {
                    if (response['data'] === true) {
                        console.log(response);
                        this.setIsCustomer();
                    }

                }
                )
                .catch(e => {
                    console.log(e);
                    console.log();
                }
                );
        }

    }

    render() {
        if (localStorage.getItem('isLoggedIn') !== "true") {
            return (
                <div className="main">
                    <h5 className="display-4 text-center">Account Dashboard</h5>
                    <hr></hr>
                    <h1 className="display-9 text-center">Not Logged In. Please log in to see the dashboard</h1>

                </div>
            )
        } else if (this.state.isAdmin === true) {
                return (
                    <div className="main">

                        <Redirect to="/Admin" />

                    </div>
                )
            }
            else if (this.state.isEmployee === true) {
                return (
                    <div className="main">
                        <Redirect to="/Employee" />

                    </div>
                )
            }
            else if (this.state.isCustomer === true) {
                return (
                    <div className="main">
                        <Redirect to="/Customer" />
                    </div>
                )
            }
            else {
                return (
                    <div className="main">
                        <h5 className="display-4 text-center">Account Dashboard</h5>
                        <hr></hr>
                        <h1 className="display-9 text-center">No Account Defined. Please contact your local admin.</h1>

                    </div>
                )
            }





    }
}
export default Dashboard;