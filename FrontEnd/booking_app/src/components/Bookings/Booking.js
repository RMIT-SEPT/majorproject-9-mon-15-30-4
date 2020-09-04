import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import servicesService from "../../services/servicesService";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state= {
            servicesCount: 0,
            services: {},
            bookingsCount: 0
        };

        this.refreshBookings = this.refreshBookings.bind(this);
    }

    componentDidMount() {
        this.refreshBookings();
    }

    refreshBookings() {
        bookingService.getAll()
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });

        servicesService.getAll()
            .then(response => {
                console.log(response);
                this.setState({servicesCount: response["data"].length});

        })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="container">
                <h4>Booking.js Debug</h4>
                <p>Services #{this.state.servicesCount}</p>
                <p>Services {}</p>
            </div>
        )
    }
}
export default Booking;
