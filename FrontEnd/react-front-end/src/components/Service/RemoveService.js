import React, { Component } from 'react'
import servicesService from "../../services/servicesService"
import employeeService from "../../services/employeeService"
class RemoveService extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            employeeId: "",
            employees: [],
            employeePlaceholder: "Select an Employee",
            employeeSelected: false,

            serviceId: "",
            services: [],
            servicePlaceholder: "Select a service.",
            serviceSelected: false,

        };

        this.updateServices = this.updateServices.bind(this);
        this.updateEmployees = this.updateEmployees.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
    {
        this.updateEmployees();
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    updateEmployees()
    {
        employeeService.getAllEmployees().then( response => 
        {
            for (const responseElement of response["data"]) 
            {
                console.log(responseElement);
                this.setState({
                    employees: [...this.state.employees,
                        responseElement["userName"]]
                });
            }
        })
        .catch(e =>
        {
            console.log(e);
        });
    }

    updateServices()
    {
            servicesService.getByEmployeeId(this.state.employeeId)
            .then( response =>
                {
                    for(const responseElement of response["data"])
                    {
                        servicesService.getById(responseElement["id"]).then(response => 
                            {
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

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value}, () =>{

            if (this.state.employeeId !== "")
            {
                this.setState({employeeSelected: true});
            }

            if (this.state.serviceId !== "")
            {
                this.setState({serviceSelected: true});
            }

            this.updateServices();
        });

    }

    onSubmit(e)
    {
        e.preventDefault();
        servicesService.delete(this.state.employeeId, this.state.serviceId);
        window.location.reload(true);
    }

    render() 
    {

        const services = this.state.services.filter((v, i ,a) => a.indexOf(v) === i).toString().split(",");
        let serviceSelectRemoval = <select className = "form-control form-control-lg "
                                    name="serviceId"
                                    value={this.state.serviceId}
                                    onChange = {this.onChange}>
                                    <option default> {this.state.servicePlaceholder}</option>
                                    {services.map(this.makeOption)}</select>;
        const employees = this.state.employees.toString().split(",");
        let employeeSelect = <select className="form-control form-control-lg "
                                     name="employeeId"
                                     value={this.state.employeeId}
                                     onChange={this.onChange}>
            <option default>{this.state.employeePlaceholder}</option>
            {employees.map(this.makeOption)}</select>;
        return (
            <div>
                
                    <h4>Remove a Service</h4>
                    <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            {employeeSelect}
                            {serviceSelectRemoval}
                        </div>
                        <input type="submit" className="btn btn-secondary btn-block mt-4"
                            disabled = {!this.state.employeeSelected || !this.state.serviceSelected}>
                        </input>
                    </form>
                
            </div>
        )
    }
    
}
export default RemoveService;