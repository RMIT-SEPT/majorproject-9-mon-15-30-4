import React, { Component } from 'react';
import "./AdminDashboard.css";
import "./AddEmployee";
import bookingService from "../../services/bookingService";
import AddEmployee from './AddEmployee';

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
            <hr></hr>
            <AddEmployee/>
            
            </div>
        )
    }
}
export default AdminDashboard;