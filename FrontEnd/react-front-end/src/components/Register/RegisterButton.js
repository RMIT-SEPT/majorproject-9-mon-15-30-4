import React from 'react'
import {Link} from "react-router-dom"


 const RegisterButton=() => {
    return (
        <React.Fragment>
            <Link to = "/Register" className="nav-link" >
                Sign Up
            </Link>  
        </React.Fragment>
    )
}
export default RegisterButton;