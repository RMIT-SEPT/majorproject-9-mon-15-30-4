import React from 'react'
import {Link} from "react-router-dom"

const AdminDashboardButton=() => {
    return (
        <React.Fragment>
            <Link to = "/Admin" className="nav-link" >
                Admin Dashboard
            </Link>
        </React.Fragment>
    )
}
export default AdminDashboardButton;