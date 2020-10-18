import React, { Component } from 'react';
import "./Dashboard.css";
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


    /** IF LOGGED IN, CHECK ACCOUNT TYPE
     *  IF the user is logged in
     *  CHECK what TYPE of account they are
     *  SET their account type to TRUE
     */
    checkAccountType() {

        if (localStorage.getItem('isLoggedIn') === "true") {
            //IF there is a valid data is TRUE, then account type is ADMIN
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
            
            //IF there is a valid data is TRUE, then account type is EMPLOYEE
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

            //IF the data response is TRUE< then the account type is CUSTOMER
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

    /** SHOW DASHBOARD BASED ON ACCOUNT TYPE AND IS LOGGED IN
     * IF the user is logged in
     *      CHECK the account type
     *          REDIRECT the user to the specific account-tyoe dashboard
     * ELSE
     *      GIVE non-logged in state
     * END IF
     */
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

                //A VERY UNLIKELY SCENARIO - IN CASE user attempts to access a dashboard through illegal means.
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