import React, { Component } from 'react';
import "./Employee.css";
import { Jumbotron, Image, Row } from "react-bootstrap";


class Employee extends Component {

    constructor()
    {
        super();
        this.state =
        {
            userName:"",
            password:"",
            name:"",
            contactEmail:"",
            contactNumber:""
        };
    }


    // renderCustomerDetails()
    // {
    //     return(

    //     );
    // }

    render() {
        return (

        
            <div className = "Content-Main">
                
                <section className = "SectionEmployeeDetails">
                    <div className = "container">
                            
                            <Jumbotron className = "EmployeeJumbo">
                                <Row className = "EmployeeSection">
                                <div className = "EmployeePortrait">
                                    <Image width = "200" src = "./images/employee-1.png"></Image>
                                </div>
                                
                                <div className ="EmployeeDetails">
                                    <h3>Welcome,</h3>
                                    <h3> NAME </h3>
                                    <h5> EMAIL </h5>
                                    <h5> PHONE NUMBER </h5>
                                    <h6>Member since 2019</h6>
                                </div>
                                </Row>
                            </Jumbotron>
                
                    </div>
                </section>

                {/* PLACE CUSTOMER BOOKING SCHEDULING HERE */}
                {/* MOST LIKELY FROM /BOOKINGS Sections */}
                <section className = "SectionEmployeeBooking">
                    <div className = "container">
                        <div className = "row">

                        </div>
                    </div>

                </section>


            </div>

        )
    }
}
export default Employee;