import React from 'react';
import './App.css';
import BookingsDashboard from "./components/Bookings/BookingsDashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddBooking from "./components/Bookings/AddBooking";
import {Provider} from "react-redux";
import store from './store';

function App() {
  return (
      <Provider store={store}>
          <Router>
            <div className="App">
                <Header/>
                <Route to="/bookingsDashboard" component={BookingsDashboard}/>
                <Route to="/addBooking" component={AddBooking}/>
            </div>
          </Router>
      </Provider>
  );
}

export default App;