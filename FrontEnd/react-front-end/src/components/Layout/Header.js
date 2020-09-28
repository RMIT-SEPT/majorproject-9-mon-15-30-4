import React, { Component } from 'react'
import {Link} from "react-router-dom";
import RegisterButton from '../Register/RegisterButton'
import BookingsButton from "../Bookings/BookingsButton";
import BookingsHistoryButton from '../Bookings/BookingHistory/BookingsHistoryButton';
import DashboardButton from "../Dashboard/DashboardButton";
import AdminDashboardButton from "../AdminDashboard/AdminDashboardButton";



import { Nav, Navbar, Button } from "react-bootstrap";


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
                  <Navbar bg = "dark" variant = "dark" style ={{color:"#00000"}} fixed = 'top'> 
                    <Navbar.Brand href = "Home">
                        <img
                        alt = ""
                        src = "./images/icon_barbell-3.png"
                        width ="50"
                        height ="50"
                        className = "icon-barbell"
                        color = "#FFFFFF"
                         />
                         
                    </Navbar.Brand>{''}

                    <Nav>
                        <BookingsButton/>
                        <BookingsHistoryButton/>
                        <DashboardButton/>
                        <AdminDashboardButton/>

                    </Nav>

                    <Nav className ="ml-auto">
                        <Button variant ="outline -info">{<RegisterButton/>} </Button>
                        <Button variant ="outline-info" >{this.logButton()}</Button>
                    </Nav> 
    
                </Navbar>
            
        </div>
      
      )


    }
}

export default Header;
