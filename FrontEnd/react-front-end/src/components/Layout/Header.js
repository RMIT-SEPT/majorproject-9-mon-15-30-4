import React, { Component } from 'react'
import {Link} from "react-router-dom";
import LoginService from '../../Services/loginService'
import RegisterButton from '../Register/RegisterButton'


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
                            <a className="nav-link " href="booking">
                                Booking
                            </a>
                        </li>
                    </ul>
    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <li className="nav-item">
                                <RegisterButton/>
                            </li>
                        </li>
                        <li className="nav-item">
                            {this.logButton()}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            </div>
        )
    }
}
export default Header;
