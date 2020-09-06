import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Header from './componets/Layout/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from './componets/Login/Login';
import Register from './componets/Register/Register';

// import {Provider} from "react-redux";
// import store from "./store";

function App() {
  return (


    <Router>
      <div>
        <Header/>
        <Route exact path="/login" component = { Login } />
        <Route exact path = "/register" component = {Register}/>
      </div>
    </Router>


      

  );
}

export default App;
