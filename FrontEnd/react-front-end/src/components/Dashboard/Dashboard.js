import React, { Component } from 'react';
import "./Dashboard.css";

class Dashboard extends Component{
    isLoggedIn = false;



    constructor(props){
        super(props)
        this.state={
            loggedIn: false
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
                </div>
            )
        }
    }
}
export default Dashboard;