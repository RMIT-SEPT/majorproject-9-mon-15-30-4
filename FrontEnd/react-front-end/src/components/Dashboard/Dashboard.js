import React, { Component } from 'react';
import "./Dashboard.css";
import bookingService from "../../services/bookingService";
import HoursButton from "../Employee/hoursButton";

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            employeeId: ""
        };
    }
    render(){
        if(this.state.loggedIn){
            return(
                <div>Logged In! Employee Username:</div>
            )
        }else{
            return(        
                <div>
                <h5 className="display-4 text-center">Employee Dashboard</h5>
                <hr></hr>
                <h1 className="display-9 text-center">Not Logged In. Please log in to see the dashboard</h1>

                        <HoursButton/>

                </div>
            )
        }
    }
}
export default Dashboard;