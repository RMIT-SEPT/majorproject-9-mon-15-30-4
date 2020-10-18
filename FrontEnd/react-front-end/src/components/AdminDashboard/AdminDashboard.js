import React, { Component } from 'react';
import {Jumbotron  } from "react-bootstrap";
import {Link} from "react-router-dom"
import "./AdminDashboard.css";
import "./AddEmployee";
import AddEmployee from './AddEmployee';
import Service from "../Service/Service"

/**ADMIN DASHBOARD COMPONENTS
 *      HAS TWO FEATURES: ADD EMPLOYEES and ASSIGNMENT of JOBS TO EMPLOYEES
 */
class AdminDashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            
        };
    }
    render(){
        return(        
            <div className = "container-fluid main">

                <h5 className="display-4 text-center">Admin Dashboard</h5>
                <hr />

                {/* SECTION to Add Employee to the database */}
                <div className="AdminContainerEmployeeRegisteration"> 
                    <div>
                        <div className="col-md-8 m-auto">
                            <AddEmployee/>
                        </div>
                    </div>
                </div>

                <hr />
                {/* Section to Assign Services to Employees */}
                <div className="AdminContainerEmployeeServiceAssignment"> 
                    <div>
                        <div className="col-md-8 m-auto">
                        <h2 className="display-5 text-center">Assign Services to Employee</h2>
                        <Jumbotron>
                            <Service/>
                        </Jumbotron>
                            <Jumbotron>
                                <React.Fragment>
                                    <Link to = "/home/employee/hours">
                                        Edit Employee Hours
                                    </Link>
                                </React.Fragment>
                            </Jumbotron>
                        </div>
                    </div>
                </div>
                {/* SUB SECTION to services - confirm button */}
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