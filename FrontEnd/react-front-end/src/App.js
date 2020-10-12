import React from 'react';
import './App.css';
import Header from './components/Layout/Header';

// import Footer from "./components/Layout/Footer";
import {BaseRoutes} from "./BaseRoutes.js";







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
        </div>




  );
}

export default App;
