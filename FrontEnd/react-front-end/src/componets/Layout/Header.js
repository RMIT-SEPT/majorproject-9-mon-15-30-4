import React, { Component } from 'react'
import LoginButton from '../Login/LoginButton'
import RegisterButton from '../Register/RegisterButton'


class Header extends Component {
    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-secondary mb-4">
            <div className="container">
                <a className="navbar-brand" href="Dashboard.html">
                    GymBros
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
    
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard">
                                Dashboard
                            </a>
                        </li>
                    </ul>
    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <RegisterButton/>
                        </li>
                        <li className="nav-item">
                            <LoginButton/>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
            </div>
        )
    }
}
export default Header;