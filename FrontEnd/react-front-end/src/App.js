import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Header from './components/Layout/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login';
import Home from './components/Home';
import Customer from "./components/Customer/Customer";
import Register from './components/Register/Register';
import AddBooking from "./components/Bookings/AddBooking";
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import RegisterEmployee from './components/RegisterEmployee/RegisterEmployee';
import Service from "./components/Service/Service";
import HoursDisplay from "./components/Employee/HoursDisplay";
import BookingsHistory from "./components/Bookings/BookingHistory/BookingsHistory";


function App() {
  
  return (


    <Router>
      <div>
        <Header/>

        <Route exact path="/Customer" component = {Customer}/>
        <Route exact path="/Home" component = {Home}/>
        <Route exact path="/Bookings" component = { AddBooking } />
        <Route exact path="/login" component = { Login } />
        <Route exact path = "/register" component = {Register}/>
        <Route exact path = "/Dashboard" component = {Dashboard}/>
        <Route exact path = "/AdminDashboard" component = {AdminDashboard}/>
        <Route exact path = "/registerEmployee" component = {RegisterEmployee}/>
        <Route exact path = "/ChangeService" component = {Service}/>
        <Route exact path = "/home/employee/hours" component = {HoursDisplay}/>
        <Route exact path = "/BookingsHistory" component = {BookingsHistory}/>
        </div>
    </Router>
  );
}

export default App;
