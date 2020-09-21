import React, { Component } from 'react'
import {Link} from "react-router-dom";
import RegisterButton from '../Register/RegisterButton'
import BookingsButton from "../Bookings/BookingsButton";
<<<<<<< HEAD
import BookingsHistoryButton from '../Bookings/BookingHistory/BookingsHistoryButton';
=======
import DashboardButton from "../Dashboard/DashboardButton";
import AdminDashboardButton from "../AdminDashboard/AdminDashboardButton";
import RegisterEmployeeButton from '../RegisterEmployee/RegisterEmployeeButton'
>>>>>>> f833317643ab1fc4929c3c28d81ee27d120a8357


class Header extends Component {

    loggedIn = false;
    userName = "";
    login(userName)
    {
        console.log("Logging In");
        this.loggedIn = true;
        this.userName = userName;
        console.log(this.loggedIn);
    }

    logout(userName)
    {
        this.loggedIn = false;
        this.userName = "";
    }

    logButton()
    {
        return (
            <React.Fragment>
                <Link to = "/Login" className="nav-link" >
                    Login
                </Link>  
            </React.Fragment>
        )   
    }
    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-4">
            <div className="container">
                <a className="navbar-brand" href="Home.html">
                    GymBros
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
    
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <BookingsButton/>
                        </li>
                    </ul>
<<<<<<< HEAD

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <BookingsHistoryButton/>
=======
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <DashboardButton/>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <AdminDashboardButton/>
>>>>>>> f833317643ab1fc4929c3c28d81ee27d120a8357
                        </li>
                    </ul>
    
                    <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <RegisterButton/>
                            </li>
                        <li className="nav-item">
                            {this.logButton()}
                        </li>
                    </ul>
                    {/* <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <RegisterEmployeeButton/>
                            </li>
                        <li className="nav-item">
                            {this.logButton()}
                        </li>
                    </ul> */}


                </div>
            </div>
        </div>
        </nav>
            </div>
        )
    }
}

export default Header;
