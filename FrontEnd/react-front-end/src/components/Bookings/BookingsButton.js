import React from 'react'
import {Link} from "react-router-dom"

const BookingsButton=() => {
    return (
        <React.Fragment>
            <Link to = "/Bookings" className="nav-link" >
                Bookings
            </Link>
        </React.Fragment>
    )
}
export default BookingsButton;