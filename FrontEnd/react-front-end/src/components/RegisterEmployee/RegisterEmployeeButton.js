import React from 'react'
import {Link} from "react-router-dom"

 const RegisterButton=() => {
    return (
        <React.Fragment>
            <Link to = "/RegisterEmployee" className="nav-link" >
                Create Employee
            </Link>  
        </React.Fragment>
    )
}
export default RegisterButton;