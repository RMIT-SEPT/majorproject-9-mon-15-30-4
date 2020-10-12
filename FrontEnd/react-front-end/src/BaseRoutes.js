import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login';
import Home from './components/Home';
import Customer from "./components/Customer/Customer";
import Employee from "./components/Employee/Employee";
import Register from './components/Register/Register';
import AddBooking from "./components/Bookings/AddBooking";
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Service from "./components/Service/Service";
import HoursDisplay from "./components/Employee/HoursDisplay";
import BookingsHistory from "./components/Bookings/BookingHistory/BookingsHistory";
import Logout from "./components/Login/Logout"
import BookingConfirm from "./components/BookingConfirm/BookingConfirm"


import "./BaseRoutes.css";

export const BaseRoutes = () => (
    <div className = "ContainerAll">
            <Route exact path="/" component = {Home}/>
            <Route exact path="/Customer" component = {Customer}/>
            <Route exact path="/Employee" component={Employee}/>
            <Route exact path="/Bookings" component = { AddBooking } />
            <Route exact path = "/BookingsHistory" component = {BookingsHistory}/>
            <Route exact path="/login" component = { Login } />
            <Route exact path = "/register" component = {Register}/>
            <Route exact path = "/Dashboard" component = {Dashboard}/>
            <Route exact path = "/Admin" component = {AdminDashboard}/>
            <Route exact path = "/ChangeService" component = {Service}/>
            <Route exact path = "/home/employee/hours" component = {HoursDisplay}/>
            <Route exact path = "/BookingsHistory" component = {BookingsHistory}/>
            <Route exact path = "/logout" component = {Logout}/>
            <Route exact path = "/BookingConfirm" component = {BookingConfirm}/>
            
    </div>
);