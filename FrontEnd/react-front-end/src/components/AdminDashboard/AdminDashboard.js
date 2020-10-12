import React, { Component } from 'react';
import {Jumbotron  } from "react-bootstrap";
import "./AdminDashboard.css";
import "./AddEmployee";
import AddEmployee from './AddEmployee';
import Service from "../Service/Service"
import {Link} from "react-router-dom";





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

            </div>
        )
    }
}
export default AdminDashboard;