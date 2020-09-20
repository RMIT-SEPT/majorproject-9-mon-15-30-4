import React, { Component } from 'react'
import servicesService from "../../services/servicesService"
import employeeService from "../../services/employeeService"
class addService extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            employeeId: "",
            employees: [],
            employeePlaceholder: "Select an Employee",
            employeeSelected: false,

            serviceId: "",
            serviceDescription: "Data Not Found",
            serviceDuration: -10,
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
        this.updateServices();
        this.updateEmployees();
    }

    makeOption = function (X) 
    {
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
        servicesService.getAll()
            .then( response =>
            {
                for (const responseElement of response["data"]) 
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
            if (this.state.serviceId !== "")
            {
                this.setState({serviceSelected: true});
            }

            if (this.state.employeeId !== "")
            {
                this.setState({employeeSelected: true});
            }
        });

        
    }

 



    onSubmit(e)
    {
        e.preventDefault();
        servicesService.getByName(this.state.serviceId).then(response =>
        {
            this.setState({
                serviceDescription: response["data"][0]["description"],
                serviceDuration: response["data"][0]["duration"],
            }, () => {
                    const newService =
                    {
                        name: this.state.serviceId,
                        duration: this.state.serviceDuration,
                        description: this.state.serviceDescription,
                        employeeId: this.state.employeeId,
            
                    }
            
                    servicesService.create(newService);
                });

        }).catch(e =>
            {
                console.log(e);
            });
            window.location.reload(true);
    }


    render() 
    {
        const services = this.state.services.filter((v, i, a) => a.indexOf(v) === i)
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
                                     onChange={this.onChange}>
            <option default>{this.state.employeePlaceholder}</option>
            {employees.map(this.makeOption)}</select>;

        return (
            <div>
                
                <h4>Add a Service</h4>
                    <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            {employeeSelect}
                            {serviceSelect}
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4"
                            disabled = {!this.state.employeeSelected || !this.state.serviceSelected}>
                        </input>
                    </form>     
            </div>
        )
    }
}
export default addService;
