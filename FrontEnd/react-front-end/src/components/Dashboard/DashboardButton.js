import React from 'react'
import {Link} from "react-router-dom"

const DashboardButton=() => {
    return (
        <React.Fragment>
            <Link to = "/Dashboard" className="nav-link" >
                Dashboard
            </Link>
        </React.Fragment>
    )
}
export default DashboardButton;