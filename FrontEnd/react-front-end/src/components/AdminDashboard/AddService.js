import React, { Component } from 'react';
import servicesService from "../../services/servicesService";
import employeeService from "../../services/employeeService";

class AddService extends Component {
    constructor(props) {
        super(props);

        //INITIALISE basic states for this scope
        this.state = {
            services: [],
            employees: [],
            availableTimes: [],
            serviceSelected: false,
            employeeSelected: false,
            servicePlaceholder: "Select a service to assign.",
            employeePlaceholder: "Select an employee to assign too.",
        };

        this.updateBookingFields = this.updateBookingFields.bind(this);
            //WHENEVER a service is changed/selected, CURRENT information (service) is changed.
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.updateBookingFields();
    }

   //UPDATE information based on user selection
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === "serviceId")
            this.updateEmployees(e.target.value);

        if (e.target.name === "employeeId")
            this.setState({ availableTimes: [] });

        if (e.target.value === this.state.employeePlaceholder)
            this.setState({ employeeSelected: false });

        if (e.target.value === this.state.servicePlaceholder) {
            this.setState({ employeeId: "" });
            this.setState({ employeeSelected: false });
            this.setState({ employees: [] });
            this.setState({ serviceSelected: false });
        }
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    //WHEN CALLED, SPECIFY INFORMATION UPDATE INFORMATION
    updateEmployees(name) {
        this.setState({ employees: [] });
        employeeService.getAll()
            .then(response => {
                for (const responseElement of response["data"]) {
                    employeeService.getByUserName(responseElement["userName"]).then(response => {
                        this.setState({
                            employees: [...this.state.services,
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
        //MANUALLY SET STATE to reflect new employee information
        this.setState({ serviceSelected: true });
        this.setState({ employeeId: "" });
        this.setState({ employeeSelected: false });
        this.setState({ availableTimes: [] });

    }

    //BOOKING information is updated
    updateBookingFields() {
        //IF a response EXISTS for services, UPDATE this.state's variables/entries
        servicesService.getAll()
            .then(response => {
                //FOR EACH element in the database, update the given forms with their specific, and range of services
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
    render() {
        const services = this.state.services
            .filter((v, i, a) => a.indexOf(v) === i)
            .toString().split(",");

            //INITIALISE services and fill in basic information in the forms
        let serviceSelect = <select className="form-control form-control-lg "
            name="serviceId"
            value={this.state.serviceId}
            onChange={this.onChange}>
            <option default>{this.state.servicePlaceholder}</option>
            {services.map(this.makeOption)}</select>;

            //INITIALISE employees and fill in basic information in the form
        const employees = this.state.employees.toString().split(",");
        let employeeSelect = <select className="form-control form-control-lg "
            name="employeeId"
            value={this.state.employeeId}
            onChange={this.onChange}
            disabled={!this.state.serviceSelected}>
            <option default>{this.state.employeePlaceholder}</option>
            {employees.map(this.makeOption)}</select>;

        //RENDER both SERVICEs and EMPLOYEE select
        return (

            <div className="container-fluid">

                <form onSubmit={this.onSubmit}>
                    <div>
                        {serviceSelect}
                    </div>

                    <div>
                        {employeeSelect}
                    </div>

                    <input type="submit" value="Assign Service" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>

        )





    }

}
export default AddService;