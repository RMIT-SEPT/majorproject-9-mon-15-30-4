import React, { Component } from 'react'
import { Jumbotron, Image, Row } from "react-bootstrap";
import "./Customer.css";




class Customer extends Component {

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
                
                <section className = "SectionCustomerDetails">
                    <div className = "container">
                            
                            <Jumbotron className = "CustomerJumbo">
                                <Row className = "CustomerSection">
                                <div className = "CustomerPortrait">
                                    <Image width = "200" src = "./images/customer-1.png"></Image>
                                </div>
                                
                                <div className ="CustomerDetails">
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
                <section className = "SectionCustomerBooking">
                    <div className = "container">
                        <div className = "row">

                        </div>
                    </div>

                </section>


            </div>

        )
    }
}
export default Customer;