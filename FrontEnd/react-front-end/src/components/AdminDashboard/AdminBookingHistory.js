import React from 'react'
import * as ReactBootStrap from "react-bootstrap";


class AdminBookingHistory extends React.Component {
    
    constructor(){
        super();
        this.state = {
            bookings: []
        };
    }

    async componentDidMount(){
        this.setState({
            bookings: (await this.requestData()).map(this.renderBookings)
        })
    }

    async requestData(){
        return await fetch("http://localhost:8080/api/bookings/all")
            .then(response => response.json())
            .then(response => {
                return Array.isArray(response) ? response : [response]
        })
    }

    async onChange(){
        const value = document.getElementById("booking-input").value
        this.requestData()
        this.setState({
            bookings: (await this.requestData())
                .filter(b => value ? b.employeeId === value : true)
                .map(this.renderBookings)           
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
            </tr>
        )
    }

    render() {
        return(
            <ReactBootStrap.Container>
                <input type="text" onChange={this.onChange.bind(this)} placeholder="EmployeeID..." className="booking-input" id="booking-input"/>

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
            </ReactBootStrap.Container>
        )
    }
}

export default AdminBookingHistory;