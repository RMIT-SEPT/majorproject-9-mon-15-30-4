import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Header from './components/Layout/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from './components/Login/Login';
import Home from './components/Home';


import Customer from "./components/Customer/Customer";
import Login from './componets/Login/Login';
import Register from './componets/Register/Register';


function App() {
  
  return (


    <Router>
      <div>
        <Header/>

        <Route exact path="/Customer" component = {Customer}/>
        <Route exact path="/Home.html" component = {Home}/>
        <Route exact path="/login" component = { Login } />
        <Route exact path = "/register" component = {Register}/>
        </div>
    </Router>
  );
}

export default App;
