import React from 'react'
import {Link} from "react-router-dom"

const BookingsHistoryButton=() => {
    return (
        <React.Fragment>
            <Link to = "/BookingsHistory" className="nav-link" >
                Bookings History
            </Link>
        </React.Fragment>
    )
}
export default BookingsHistoryButton;