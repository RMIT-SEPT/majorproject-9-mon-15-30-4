import React, { Component } from 'react'
import AddService from './addService';
import RemoveService from './RemoveService';
export default class Service extends Component 
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            employeeId: "1",
        };
    }

    getEmployeeId()
    {
        return this.state.employeeId;
    }

    render() {
        return (
            <div>
                {/* <h1>Assign Services to Employees</h1> */}
                    <AddService employeeId/>
                    <RemoveService employeeId/>
            </div>
        )
    }
}





// import React, { Component } from 'react'
// import servicesService from "../../services/servicesService"
// class Service extends Component 
// {
//     constructor(props)
//     {
//         super(props);
//         this.state = {
//             employeeId: "2",//1 is used for testing. Need to know how to parse emploeeeId from previous page

//             serviceId: "",
//             serviceDescription: "",
//             serviceDuration: 0,
//             services: [],
//             serviceIdRemove:"",
//             employeeServices: [],
//             servicePlaceholder: "Select a service.",
//             serviceSelected: false,
//             serviceSelectedRemoval: false,
//         };

//         this.updateServices = this.updateServices.bind(this);

//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         // this.onChangeRemoval = this.onChangeRemoval.bind(this);
//         this.onSubmitRemoval = this.onSubmitRemoval(this);
//     }

//     componentDidMount() {
//         this.updateServices();
//     }

//     makeOption = function (X) {
//         return <option key={"itemId" + X}>{X}</option>;
//     };

//     updateServices()
//     {
//         servicesService.getAll()
//             .then( response =>
//             {
//                 console.log(response);
//                 for (const responseElement of response["data"]) 
//                 {
                    
//                     servicesService.getById(responseElement["id"]).then(response => 
//                     {
//                         this.setState({
//                             services: [...this.state.services,
//                                 response["data"]["name"]]
//                         });
//                     }).catch(e => {
//                         console.log(e);
//                     });
//                 }
//             })
//             .catch(e => {
//                 console.log(e);
//             });
        
//             servicesService.getByEmployeeId(this.state.employeeId)
//             .then( response =>
//                 {
//                     for(const responseElement of response["data"])
//                     {
//                         servicesService.getById(responseElement["id"]).then(response => 
//                             {
//                                 this.setState({
//                                     employeeServices: [...this.state.employeeServices,
//                                         response["data"]["name"]]
//                                 });
//                             }).catch(e => {
//                                 console.log(e);
//                             });
//                     }
//                 })
//             .catch(e => {
//                 console.log(e);
//             });

//     }

//     onChange(e)
//     {
//         this.setState({[e.target.name]: e.target.value});

//         if (this.state.serviceId !== "")
//         {
//             console.log("Service Detected: " + this.state.serviceId)
//             this.setState({serviceSelected: true});

//         }
        
//         if (this.state.serviceIdRemove !== "")
//         {
//             console.log("Service Removal Detected: " + this.state.serviceIdRemove);
//             this.setState({serviceSelectedRemoval: true});
//         }
        
//     }

 

//     onSubmitRemoval(e)
//     {
//         // e.preventDefault();
//         console.log(this.state.serviceSelectedRemoval);
//         console.log(this.state.serviceIdRemove);
//         this.setState({serviceIdRemove: "Medical",});
//         servicesService.delete(this.state.employeeId, this.state.serviceIdRemove);

        
//     }
//     onSubmit(e)
//     {
//         e.preventDefault();
//         console.log(this.state.serviceId);
//         console.log(this.state.serviceSelected);
//         servicesService.getByName(this.state.serviceId).then(response =>
//         {
//             for(const responseElement of response["data"])
//             {
//                 this.setState({
//                     serviceDescription: response["data"]["description"],
//                     serviceDuration: response["data"]["duration"],
//                 });
//             }
//         }).catch(e)
//         {

//         }
//         const newService =
//         {
//             name: this.state.serviceId,
//             duration: 100,
//             description: "Hello Darkness My old Friend",
//             employeeId: this.state.employeeId,

//         }

//         servicesService.create(newService);
//     }

//     render() 
//     {
//         const services = this.state.services.filter((v, i, a) => a.indexOf(v) === i)
//             .toString().split(",");
//         let serviceSelect = <select className="form-control form-control-lg "
//                                     name="serviceId"
//                                     value={this.state.serviceId}
//                                     onChange={this.onChange}>
//             <option default>{this.state.servicePlaceholder}</option>
//             {services.map(this.makeOption)}</select>;

//         const employeeServices = this.state.employeeServices.filter((v, i ,a) => a.indexOf(v) === i).toString().split(",");
//         let serviceSelectRemoval = <select className = "form-control form-control-lg "
//                                     name="serviceIdRemove"
//                                     value={this.state.serviceIdRemove}
//                                     onChange = {this.onChange}>
//                                     <option default> {this.state.servicePlaceholder}</option>
//                                     {employeeServices.map(this.makeOption)}</select>;

//         return (
//             <div>
//                 <h1>Edit Service</h1>
//                     <h4>Add a Service</h4>
//                     {<form onSubmit = {this.onSubmit}>
//                         <div className="form-group">
//                             {serviceSelect}
//                         </div>

//                         <input type="submit" className="btn btn-primary btn-block mt-4"
//                                        disabled={!this.state.serviceSelected}>
//                         </input>
//                     </form> }
//                     <h4>Remove a Service</h4>
//                     <form onSubmit = {this.onSubmitRemoval}>
//                         <div className="form-group">
//                             {serviceSelectRemoval}
//                         </div>
//                         <input type="submit" className="btn btn-secondary btn-block mt-4"
//                                        disabled={!this.state.serviceSelectedRemoval}>
//                         </input>
//                     </form>
                
//             </div>
//         )
//     }
// }

// export default Service;
