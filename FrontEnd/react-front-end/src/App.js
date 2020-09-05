import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Header from './componets/Layout/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from './componets/Login/Login';

// import {Provider} from "react-redux";
// import store from "./store";

function App() {
  return (


    <Router>
      <div>
        <Header/>
        <Route exact path="/login" component = { Login } />
      </div>
    </Router>


      

  );
}

export default App;
