import React from 'react'
import {Link} from "react-router-dom"

 const LoginButton=() => {
    return (
        <React.Fragment>
            <Link to = "/Login" className="nav-link" >
                Login
            </Link>  
        </React.Fragment>
    )
}
export default LoginButton;