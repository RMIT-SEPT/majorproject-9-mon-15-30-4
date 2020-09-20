import React, { Component } from 'react';
import servicesService from "../../services/servicesService";
import employeeService from "../../services/employeeService";

class AddService extends Component{
    constructor(props) {
        super(props);

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

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.updateBookingFields();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.name === "serviceId")
            this.updateEmployees(e.target.value);

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
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    updateEmployees(name) {
        this.setState({employees: []});
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
        this.setState({serviceSelected: true});
        this.setState({employeeId: ""});
        this.setState({employeeSelected: false});
        this.setState({availableTimes: []});
        console.log(this.state.employeeId);
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
    render(){
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
        return(
            <div>
                <h2 className="display-5 text-center">Assign Service to Employee</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {serviceSelect}
                    </div>
                    <div className="form-group">
                        {employeeSelect}
                    </div>
                    
                    <input type="submit" value = "Assign Service" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>

        )





    }

}
export default AddService;