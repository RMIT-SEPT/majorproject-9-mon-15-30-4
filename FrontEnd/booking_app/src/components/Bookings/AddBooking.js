import React, { Component } from "react";
import bookingService from "../../services/bookingService";
import servicesService from "../../services/servicesService";
import workingHoursService from "../../services/workingHoursService";
import employeeService from "../../services/employeeService";

class AddBooking extends Component {
    constructor(props){
        super(props);

        this.state= {
            date: "",
            time: "",
            serviceId: "",
            employeeId: "",
            servicesCount: 0,
            services: [],
            employees: [],
            availableTimes: [],
            bookingsCount: 0,
            servicePlaceholder: "Select a service.",
            employeePlaceholder: "Select a employee.",
            serviceSelected: false,
            employeeSelected: false
        };

        this.updateBookingFields = this.updateBookingFields.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        this.updateBookingFields();
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    updateBookingFields() {
        servicesService.getAll()
            .then(response => {
                this.setState({servicesCount: response["data"].length});
                for (const responseElement of response["data"]) {
                    servicesService.getById(responseElement["id"]).then(response => {
                        this.setState({services: [...this.state.services,
                                response["data"]["name"]]});
                    }).catch(e => {
                            console.log(e);
                    });

                }

            })
            .catch(e => {
                console.log(e);
            });

    }

    onChange(e){
      this.setState({[e.target.name]: e.target.value});
      console.log("CT: " + e.target.name + " : " + e.target.value);
      if(e.target.name == "serviceId")
          this.updateEmployees(e.target.value);

      if(this.state.serviceId !== "")
        if(e.target.name === "employeeId" && e.target.value !== this.state.employeePlaceholder) {
            this.setState({employeeSelected: true});
            bookingService.getByEmployee(e.target.value.split("#")[1]).then(response => {
                console.log(response["data"]);
                for (const responseElement of response["data"]) {
                    this.setState({availableTimes: [...this.state.availableTimes,
                                responseElement]});
                }
            }).catch(e => {
                console.log(e);
            });
        }

        if(e.target.value === this.state.employeePlaceholder)
            this.setState({employeeSelected: false});

      if(e.target.value === this.state.servicePlaceholder) {
          this.setState({employeeId: ""});
          this.setState({employeeSelected: false});
          this.setState({employees: []});
          this.setState({serviceSelected: false});
      }
    }

    updateEmployees(name){
        this.setState({employees: []});
        servicesService.getByName(name)
            .then(response => {
                for (const responseElement of response["data"]) {
                    employeeService.getByUserName(responseElement["employeeId"])
                        .then(response => {
                                this.setState({employees: [...this.state.employees,
                                        response["data"]["name"] + " #" + response["data"]["userName"]]});
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

    onSubmit(e){
        e.preventDefault();
        const newBooking = {
            date: this.state.date,
            time: this.state.time,
            serviceId: this.state.serviceId.split("#")[1],
            employeeId: this.state.employeeId.split("#")[1]
        }
        console.log(newBooking);
        bookingService.create(newBooking)
            .then(response => {
                console.log(response);
            })
        .catch(e => {
            console.log(e);
        });
    }

    makeOption = function(X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    formatAvailableTimes(){
        let formattedString = <div><h3>Available Times:</h3></div>;
        // for (const element of this.state.availableTimes) {
        //     console.log(element);
        //     // 0,2020,8,17,8,30,10,30
        //     formattedString += <h5>Day: {element[0].value}, {element[3]}/{element[2]}/{element[1]},
        //         {element[4]}:{element[5]} - {element[6]}:{element[7]}</h5>;
        // }
        return formattedString;
    }

    render() {
        const services = this.state.services
            .filter((v, i, a) => a.indexOf(v) === i)
            .toString().split(",");
        let serviceSelect = <select className="form-control form-control-lg "
                         name="serviceId"
                         value= {this.state.serviceId}
                         onChange = {this.onChange} >
                            <option default>{this.state.servicePlaceholder}</option>
                            {services.map(this.makeOption)}</select>;

        const employees = this.state.employees.toString().split(",");
        let employeeSelect = <select className="form-control form-control-lg "
                                    name="employeeId"
                                    value= {this.state.employeeId}
                                    onChange = {this.onChange}
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
                            <hr />
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
                                           value= {this.state.date}
                                           onChange = {this.onChange}
                                           disabled={!this.state.employeeSelected}
                                    />
                                </div>
                                <h6>Time</h6>
                                <div className="form-group">
                                    <input type="time" className="form-control form-control-lg"
                                           name="time"
                                           value= {this.state.time}
                                           onChange = {this.onChange}
                                           disabled={!this.state.employeeSelected}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                            {availableTimes}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddBooking;