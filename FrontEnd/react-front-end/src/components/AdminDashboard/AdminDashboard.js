import React, { Component } from 'react';
import "./AdminDashboard.css";
import "./AddEmployee";

import AddEmployee from './AddEmployee';

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

            </div>
        )
    }
}
export default AdminDashboard;