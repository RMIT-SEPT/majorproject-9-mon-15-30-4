import React from 'react';
import Header from './components/Layout/Header';
import {BaseRoutes} from "./BaseRoutes.js";




function App() {
  
  return (


        <div className = "AppSite">
          
          <div className = "SiteContent">

            {/* Header Related Content Placed here */}
            <div className = "AppHeader">
                <Header/>
            </div>

            {/* Main Content Added here */}
            <div className = "AppMain">
                <BaseRoutes/>
            </div>

          </div>
          {/* Sticky footer can be placed here */}
        </div>

  );
}

export default App;
