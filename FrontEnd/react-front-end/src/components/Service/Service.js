import React, { Component } from 'react'
import servicesService from "../../services/servicesService"
class Service extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            employeeId: "2",//1 is used for testing. Need to know how to parse emploeeeId from previous page

            serviceId: "",
            services: [],
            serviceIdRemove:"",
            employeeServices: [],
            servicePlaceholder: "Select a service.",
            serviceSelected: false,
            serviceSelectedRemoval: false,
        };

        this.updateServices = this.updateServices.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeRemoval = this.onChangeRemoval.bind(this);
        this.onSubmitRemoval = this.onSubmitRemoval(this);
    }

    componentDidMount() {
        this.updateServices();
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    updateServices()
    {
        servicesService.getAll()
            .then( response =>
            {
                console.log(response);
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
        
            servicesService.getByEmployeeId(this.state.employeeId)
            .then( response =>
                {
                    for(const responseElement of response["data"])
                    {
                        servicesService.getById(responseElement["id"]).then(response => 
                            {
                                this.setState({
                                    employeeServices: [...this.state.employeeServices,
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
        this.setState({[e.target.name]: e.target.value});

        if (this.state.serviceId !== "")
        {
            this.setState({serviceSelected: true});

        }
        
        
    }

    onChangeRemoval(e)
    {
        this.setState({[e.target.name]: e.target.value});

        if (this.state.serviceIdRemove !== "")
        {
            this.setState({serviceSelectedRemoval: true});
        }
    }

    onSubmitRemoval(e)
    {
        // e.preventDefault();
        console.log(this.state.serviceIdRemove);
    }
    onSubmit(e)
    {
        e.preventDefault();
        console.log(this.state.serviceId);
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

        const employeeServices = this.state.employeeServices;
        let serviceSelectRemoval = <select className = "form-control form-control-lg "
                                    name="serviceIdRemove"
                                    value={this.state.serviceIdRemove}
                                    onChange = {this.onChangeRemoval}>
                                    <option default> {this.state.servicePlaceholder}</option>
                                    {employeeServices.map(this.makeOption)}</select>;

        return (
            <div>
                <h1>Edit Service</h1>
                    <h4>Add a Service</h4>
                    {<form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            {serviceSelect}
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4"
                                       disabled={!this.state.serviceSelected}>
                        </input>
                    </form> }
                    <h4>Remove a Service</h4>
                    <form onSubmit = {this.onSubmitRemoval}>
                        <div className="form-group">
                            {serviceSelectRemoval}
                        </div>
                        <input type="submit" className="btn btn-secondary btn-block mt-4"
                                       disabled={!this.state.serviceSelectedRemoval}>
                        </input>
                    </form>
                
            </div>
        )
    }
}

export default Service;
