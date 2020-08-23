import React, { Component } from 'react'
import Booking from './Bookings/Booking'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Hello!</h1>
                <Booking/>
                <Booking/>
                <Booking/>
                <Booking/>
            </div>
        )
    }
}

export default Dashboard;
