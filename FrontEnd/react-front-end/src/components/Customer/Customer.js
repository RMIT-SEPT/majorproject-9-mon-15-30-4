import React, { Component } from 'react'
import { Jumbotron, Image, Row } from "react-bootstrap";
import "./Customer.css";
import customerService from "../../services/customerService";



class Customer extends Component {

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
        this.getCustomerInfo(this);
    }

    /** GET SPECIFIC CUSTOMER INFORMATION, & UPDATE
     *      ASSUMING that the customer IS LOGGED IN
     *      ASSUMING that the customer EXISTS within the database
     *      RETRIEVE the customer's token
     *      UPDATE the 'current' information from the customers TOKEN
     */
    getCustomerInfo() {

        customerService.getByToken().then(
            response => {
                this.setState({
                    userName: response["data"]["userName"],
                    name: response["data"]["name"],
                    contactEmail: response["data"]["contactEmail"],
                    contactNumber: response["data"]["contactNumber"]
                });
            }
        );
    }


    //RENDER CUSTOMER SPECIFIC INFORMATION
    render() {
        return (
            <div className="Content-Main">

                <section className="SectionCustomerDetails">
                    <div className="container">

                    {/* SECTION for CUSTOMER INFORMATION */}
                        <Jumbotron className="CustomerJumbo">
                            <Row className="CustomerSection">
                                {/* FOR CUSTOMER PORTRAITS */}
                                <div className="CustomerPortrait">
                                    <Image width="200" src="./images/customer-1.png"></Image>
                                </div>

                                <div className="CustomerDetails">
                                    <h3>Welcome, {this.state.name}</h3>
                                    <h5> EMAIL: {this.state.contactEmail} </h5>
                                    <h5> PHONE NUMBER: {this.state.contactNumber} </h5>
                                    <h6> Remember to work hard!</h6>
                                </div>
                            </Row>
                        </Jumbotron>

                    </div>
                </section>

                {/* PLACE CUSTOMER BOOKING SCHEDULING HERE */}
                {/* MOST LIKELY FROM /BOOKINGS Sections */}
                <section className="SectionCustomerBooking">
                    <div className="container">
                        <div className="row">

                        </div>
                    </div>

                </section>


            </div>

        )
    }
}
export default Customer;