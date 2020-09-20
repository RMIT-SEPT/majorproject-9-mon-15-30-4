import React, { Component } from 'react';

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
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };
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