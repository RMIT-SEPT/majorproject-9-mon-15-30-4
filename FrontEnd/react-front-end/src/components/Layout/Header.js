import React, { Component } from 'react'
import {Link} from "react-router-dom";
import RegisterButton from '../Register/RegisterButton'
import BookingsButton from "../Bookings/BookingsButton";
import BookingsHistoryButton from '../Bookings/BookingHistory/BookingsHistoryButton';
import DashboardButton from "../Dashboard/DashboardButton";





import "./Header.css"
import { Nav, Navbar, Button} from "react-bootstrap";


class Header extends Component {


    logButton()
    {
        if(localStorage.getItem('isLoggedIn') === "true")
        {
            return (
                <React.Fragment>
                    <Link to = "/Logout" className="nav-link" >
                        Logout
                    </Link>  
                </React.Fragment>
                
            )   
        }
        else
        {
            return(
                <React.Fragment>
                    <Link to = "/Login" className="nav-link" >
                        Login
                    </Link>  
                </React.Fragment>
            )
        }
        
    }

    render() {
        return (
            <div className = "fixed-top">
                  <Navbar bg = "dark" variant = "dark" style ={{color:"#00000"}} fixed = 'top'> 
                    <Navbar.Brand href = "/">
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
