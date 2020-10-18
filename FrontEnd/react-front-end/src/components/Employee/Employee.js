import React, { Component } from 'react';
import "./Employee.css";
import { Jumbotron, Image, Row } from "react-bootstrap";
import HoursNotEditable from "./HoursNoEditable";
import employeeService from "../../services/employeeService";

//Assumptions -- The user is already logged in.

class Employee extends Component {

    constructor() {
        super();
        this.state =
        {
            userName: "",
            password: "",
            name: "",
            contactEmail: "",
            contactNumber: ""
        };

        // this.checkLogin(this);
        this.getEmployeeInfo(this);

        // console.log("The results for isEmployee is: " + this.state.isEmployee);
    };

    /** GET CURRENT EMPLOYEE INFORMATION & UPDATE DASHBOARD
     *      ASSUMING the employee IS LOGGED IN
     *      ASSUMING the employee EXISTS in the database
     *      GET the employee from the backend
     *      UPDATE the current information
     */
    getEmployeeInfo() {
        employeeService.getByToken().then(response => {
            this.setState(
                {
                    userName: response["data"]["userName"],
                    name: response["data"]["name"],
                    contactEmail: response["data"]["employeeEmail"],
                    contactNumber: response["data"]["employeePhone"]


                }
            )
        });

    };

    //SHOW CASE the CURRENT EMPLOYEE's information
    render() {
        return (

            <div className="Content-Main">
                
                {/* SECTION for current employee's information */}
                <section className="SectionEmployeeDetails">
                    <div className="container">

                        <Jumbotron className="EmployeeJumbo">
                            <Row className="EmployeeSection">
                                {/* SECTION for EMPLOYEE"S PORTRAIT */}
                                <div className="EmployeePortrait">
                                    <Image width="200" src="./images/employee-1.png"></Image>
                                </div>
                                {/* SECTION FOR EMPLOYEE"S DETAILS */}
                                <div className="EmployeeDetails">
                                    <h3>Welcome, {this.state.name}</h3>
                                    <h5> EMAIL: {this.state.contactEmail} </h5>
                                    <h5> PHONE NUMBER: {this.state.contactNumber} </h5>
                                    <h6>Remember to have a good day!</h6>
                                </div>
                            </Row>
                        </Jumbotron>

                    </div>
                </section>

                <HoursNotEditable />
                {/* PLACE CUSTOMER BOOKING SCHEDULING HERE */}
                {/* MOST LIKELY FROM /BOOKINGS Sections */}
                <section className="SectionEmployeeBooking">
                    <div className="container">
                        <div className="row">

                        </div>
                    </div>

                </section>


            </div>

        )
    }
}
export default Employee;