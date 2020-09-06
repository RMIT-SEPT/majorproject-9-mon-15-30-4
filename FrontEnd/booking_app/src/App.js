import React from 'react';
import './App.css';
import AddBooking from "./components/Bookings/AddBooking";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store';

function App() {
  return (
      <Provider store={store}>
          <Router>
            <div className="App">
                <Header/>
                <Route to="/booking" component={AddBooking}/>
            </div>
          </Router>
      </Provider>
  );
}

export default App;