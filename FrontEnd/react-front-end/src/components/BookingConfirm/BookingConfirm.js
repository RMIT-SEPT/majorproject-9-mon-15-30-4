import React, { Component } from 'react';
import "./BookingConfirm.css";
import * as ReactBootStrap from "react-bootstrap";
import bookingService from "../../services/bookingService";


class BookingConfirm extends Component{
    constructor(){
        super();
        this.state = {
            bookings: []
        };
    }

    async componentDidMount(){

        bookingService.getAll().then(response => {

            let data = response['data'];
            data = Array.isArray(response['data']) ? data : [data];
            console.dir(data);

            this.setState({
                bookings: data.map(this.renderBookings)
            })
        })

    }

    renderBookings(booking, index) {
        return(
            <tr key={index}>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              <td>{booking.customerId}</td>
              <td>{booking.employeeId}</td>
              <td>{booking.serviceId}</td>
              <td><input type="button" value = "Confirm" className="btn btn-primary btn-block mt-4" /></td>              
            </tr>
        )
    }
    render() {
        return(
            <div>
                <ReactBootStrap.Table striped bordered hover size="sm" id="table1">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>CustomerID</th>
                        <th>EmployeeID</th>
                        <th>ServiceID</th>
                        <th>Confirmation</th>
                        </tr>
                    </thead>
                <tbody>
                    {this.state.bookings} 
                </tbody>
                </ReactBootStrap.Table>
            </div>
        )
    }
}

export default BookingConfirm;