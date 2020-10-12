import React from 'react'
import * as ReactBootStrap from "react-bootstrap";
import './BookingsHistoryCSS.css'
import bookingService from '../../../services/bookingService'
class BookingsHistory extends React.Component {
    
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
        // const url = "http://localhost:8080/api/bookings/all";
        // const response = await fetch(url);
        // let data = await response.json();
        // data = Array.isArray(data) ? data : [data];
        // console.dir(data);

        
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
            <div>

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
        
            </div>
        )
    }
}

export default BookingsHistory;