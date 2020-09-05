import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import servicesService from "../../services/servicesService";
import workingHoursService from "../../services/workingHoursService";
import employeeService from "../../services/employeeService";

class AddBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            time: "",
            serviceId: "",
            employeeId: "",
            services: [],
            employees: [],
            availableTimes: [],
            servicePlaceholder: "Select a service.",
            employeePlaceholder: "Select a employee.",
            serviceSelected: false,
            employeeSelected: false,
            dateSelected: false,
            timeSelected: false
        };

        this.updateBookingFields = this.updateBookingFields.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        this.updateBookingFields();
    }

    /*
     * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
     * User: TLindig
     */
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    updateBookingFields() {
        servicesService.getAll()
            .then(response => {
                for (const responseElement of response["data"]) {
                    servicesService.getById(responseElement["id"]).then(response => {
                        this.setState({
                            services: [...this.state.services,
                                response["data"]["name"]]
                        });
                    }).catch(e => {
                        console.log(e);
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.name == "serviceId")
            this.updateEmployees(e.target.value);

        if (this.state.serviceId !== "")
            if (e.target.name === "employeeId" && e.target.value !== this.state.employeePlaceholder) {
                this.setState({employeeSelected: true});
                bookingService.getByEmployee(e.target.value.split("#")[1]).then(response => {
                    for (const responseElement of response["data"]) {
                        this.setState({
                            availableTimes: [...this.state.availableTimes,
                                responseElement]
                        });
                    }
                }).catch(e => {
                    console.log(e);
                });
            }

        if(e.target.name === "employeeId")
            this.setState({availableTimes: []});

        if (e.target.value === this.state.employeePlaceholder)
            this.setState({employeeSelected: false});

        if (e.target.value === this.state.servicePlaceholder) {
            this.setState({employeeId: ""});
            this.setState({employeeSelected: false});
            this.setState({employees: []});
            this.setState({serviceSelected: false});
        }

        if (e.target.name === "date")
            this.setState({dateSelected: true});
        if (e.target.name === "time")
            this.setState({timeSelected: true});
    }

    updateEmployees(name) {
        this.setState({employees: []});
        servicesService.getByName(name)
            .then(response => {
                for (const responseElement of response["data"]) {
                    employeeService.getByUserName(responseElement["employeeId"])
                        .then(response => {
                            this.setState({
                                employees: [...this.state.employees,
                                    response["data"]["name"] + " #" + response["data"]["userName"]]
                            });
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            })
            .catch(e => {
                console.log(e);
            });
        this.setState({serviceSelected: true});
    }

    onSubmit(e) {
        let submit = false;
        e.preventDefault();
        servicesService.getByEmployeeAndName(
            this.state.employeeId.split("#")[1],
            this.state.serviceId).then(response => {
            const newBooking = {
                customerId: "1",
                date: this.state.date + "@" + this.state.time + ":00.000+1000",
                serviceId: response["data"]["id"],
                employeeId: this.state.employeeId.split("#")[1]
            }
            submit = this.confirmTimeslot(newBooking.date, newBooking.serviceId,
                newBooking.employeeId).then(response => {
                if(response["data"]) {
                    bookingService.create(newBooking);
                    this.resetForm();
                }
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            console.log(e);
        });
    }

    confirmTimeslot(date, serviceId, employeeId){
        return bookingService.checkAvailable(date, serviceId, employeeId);
    }

    resetForm(){
        this.setState({serviceId: ""});
        this.setState({employeeId: ""});
        this.setState({date: ""});
        this.setState({time: ""});
        this.setState({serviceSelected: false});
        this.setState({employeeSelected: false});
        this.setState({dateSelected: false});
        this.setState({timeSelected: false});
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    formatAvailableTimes() {
        let formattedString = "Available Times: \n";
        for (const element of this.state.availableTimes) {
            formattedString += element[3] + "/" + element[2] + "/" + element[1] + ", "
                + element[4] + ":" + element[5] + " - " + element[6] + ":" + element[7]
                + "\n";
        }
        return formattedString;
    }

    render() {
        const services = this.state.services
            .filter((v, i, a) => a.indexOf(v) === i)
            .toString().split(",");
        let serviceSelect = <select className="form-control form-control-lg "
                                    name="serviceId"
                                    value={this.state.serviceId}
                                    onChange={this.onChange}>
            <option default>{this.state.servicePlaceholder}</option>
            {services.map(this.makeOption)}</select>;

        const employees = this.state.employees.toString().split(",");
        let employeeSelect = <select className="form-control form-control-lg "
                                     name="employeeId"
                                     value={this.state.employeeId}
                                     onChange={this.onChange}
                                     disabled={!this.state.serviceSelected}>
            <option default>{this.state.employeePlaceholder}</option>
            {employees.map(this.makeOption)}</select>;

        let availableTimes = this.formatAvailableTimes();

        return (
            <div className="Booking">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Booking</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    {serviceSelect}
                                </div>
                                <div className="form-group">
                                    {employeeSelect}
                                </div>
                                <h6>Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg"
                                           name="date"
                                           value={this.state.date}
                                           onChange={this.onChange}
                                           disabled={!this.state.employeeSelected}
                                    />
                                </div>
                                <h6>Time</h6>
                                <div className="form-group">
                                    <input type="time" className="form-control form-control-lg"
                                           name="time"
                                           value={this.state.time}
                                           step="900"
                                           onChange={this.onChange}
                                           disabled={!this.state.employeeSelected}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4"
                                       disabled={!this.state.serviceSelected || !this.state.employeeSelected
                                       || !this.state.dateSelected || !this.state.timeSelected}/>
                            </form>
                            <pre>{availableTimes}</pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddBooking;