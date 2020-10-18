import React from 'react'
import * as ReactBootStrap from "react-bootstrap";
import './BookingsHistory.css'
import bookingService from '../../../services/bookingService'
class BookingsHistory extends React.Component {
    
    constructor(){
        super();
        this.state = {
            bookings: []
        };
    }
    //LINK BACK-END INFORMATION to the GIVEN FRONT-END
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

    //RENDER INFORMATION under the respective table/rows/columns
        //WHENEVER function is called/updated from the database, they information appears within the front-end
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

    //SHOW INDIVIDUAL TABLE
    render() {
        return(
            <div>
            
            {/* HEADERS AND TITLES FOR THE BOOKING HISTORY TABLE */}
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
            {/* INFORMATION FOR BOOKING IS RENDERED/SEEN HERE */}
            <tbody>
                {this.state.bookings} 
            </tbody>
            </ReactBootStrap.Table>
        
            </div>
        )
    }
}

export default BookingsHistory;