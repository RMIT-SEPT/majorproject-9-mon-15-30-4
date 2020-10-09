import React, { Component } from 'react';
import {Link} from "react-router-dom"
import "./AdminDashboard.css";
import "./AddEmployee";
import bookingService from "../../services/bookingService";
import AddEmployee from './AddEmployee';
import AddService from './AddService';
import Service from "../Service/Service"

class AdminDashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            
        };
    }
    render(){
        return(        
            <div>
                <h5 className="display-4 text-center">Admin Dashboard</h5>
                <hr />
                <div className="container"> 
                    <div className="form-popup">
                        <div className="col-md-8 m-auto">
                            <AddEmployee/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container"> 
                    <div className="form-popup">
                        <div className="col-md-8 m-auto">
                            <Service/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <React.Fragment>
                        <Link to = "/BookingConfirm" className="nav-link" >
                            <input type="button" value = "Confirm New Bookings" className="btn btn-primary btn-block mt-4" />
                        </Link>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}
export default AdminDashboard;