import React, { Component } from 'react'
import Customer from './Customer/Customer'
import "bootstrap/dist/css/bootstrap.min.css"

class Dashboard extends Component {
    render() {
        return (
            <div>
            <h1 className="alert alert-warning:">Welcome to Dashboard</h1>
                <Customer/>
            </div>
        )
    }
}
export default Dashboard;