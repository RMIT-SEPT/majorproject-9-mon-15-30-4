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


    getEmployeeInfo() {
        console.log();


        employeeService.getByToken().then(response => {
            console.log(response);
            console.log(response["data"]["userName"]);
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

    render() {
        return (

            <div className="Content-Main">

                <section className="SectionEmployeeDetails">
                    <div className="container">

                        <Jumbotron className="EmployeeJumbo">
                            <Row className="EmployeeSection">
                                <div className="EmployeePortrait">
                                    <Image width="200" src="./images/employee-1.png"></Image>
                                </div>

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