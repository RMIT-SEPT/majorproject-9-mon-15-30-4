import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
<<<<<<< HEAD
// import Footer from "./components/Layout/Footer";
import {BaseRoutes} from "./BaseRoutes.js";

=======
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login';
import Home from './components/Home';
import Customer from "./components/Customer/Customer";
import Register from './components/Register/Register';
import AddBooking from "./components/Bookings/AddBooking";
import BookingsHistory from './components/Bookings/BookingHistory/BookingsHistory';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import RegisterEmployee from './components/RegisterEmployee/RegisterEmployee';
import Service from "./components/Service/Service";
import HoursDisplay from "./components/Employee/HoursDisplay";
import BookingConfirm from "./components/BookingConfirm/BookingConfirm"



function App() {
  
  return (


        <div className = "AppSite">
          <div className = "SiteContent">
            <div className = "AppHeader">
                <Header/>
            </div>
            <div className = "AppMain">
                <BaseRoutes/>
            </div>

          </div>




  );
}

export default App;
