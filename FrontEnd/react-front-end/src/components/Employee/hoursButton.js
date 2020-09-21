import React from 'react'
import {Link} from "react-router-dom"

const HoursButton=() => {
    return (
        <React.Fragment>
            <Link to = "/home/employee/hours" className="nav-link" >
                Edit (Hours)
            </Link>
        </React.Fragment>
    )
}
export default HoursButton;