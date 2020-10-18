import React from 'react'
import * as ReactBootStrap from "react-bootstrap";
import './CustBooking.css'
import bookingService from '../../../services/bookingService'
class CustBookingHistory extends React.Component {
    
    constructor(){
        super();
        this.state = {
            bookings: []
        };
    }

    async componentDidMount(){
        bookingService.getAll()
            .then(response => Array.isArray(response["data"]) ? response["data"] : [response["data"]])
            .then(response => Array.from(response))
            .then(response => response.filter(b => b.customerId === this.props.userName))
            .then(response => this.setState({
                bookings: response.map(this.renderBookings)
            }))    
    }
   
    renderBookings(booking, index) {
        return(
            <tr key={index}>
              <td>{booking.id}</td>
              <td>{booking.date}</td>
              <td>{booking.customerId}</td>
              <td>{booking.employeeId}</td>
              <td>{booking.serviceId}</td>              
            </tr>
        )
    }

    render() {
        return(
            <ReactBootStrap.Table striped bordered hover size="sm" id="table1">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>CustomerID</th>
                    <th>EmployeeID</th>
                    <th>ServiceID</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.bookings} 
                </tbody>
            </ReactBootStrap.Table>
        )
    }
}

export default CustBookingHistory;