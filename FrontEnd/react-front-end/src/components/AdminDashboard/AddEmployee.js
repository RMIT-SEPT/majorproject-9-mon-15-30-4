import React, { Component } from 'react';

class AddEmployee extends Component{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            userName:"",
            password:"",
            name:"",
            contactEmail:"",
            contactNumber:""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e)
    {
        this.setState
        (
            {
                [e.target.name]: e.target.value
            }
        );
    }

    onSubmit(e)
    {
        e.preventDefault();
        /*
        * const newAccount is an intern 'struct', allowing us to access certain key properties
        */
        const newAccount =
        {
            userName: this.state.userName,
            password: this.state.password,
            name: this.state.name,
            contactEmail: this.state.contactEmail,
            contactNumber: this.state.contactNumber

        }
        console.log(newAccount);
    }
    render(){

        return(        
            <div>
            <h2 className="display-5 text-center">Add New Employee</h2>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg " 
                    placeholder="Employee Username" 
                    name="userName"
                    value= {this.state.userName}
                    onChange = {this.onChange}
                    />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control form-control-lg " 
                    placeholder="Employee Password" 
                    name="password"
                    value= {this.state.password}
                    onChange = {this.onChange}
                    />
                </div>


                <div className="form-group">
                    <input type="text" className="form-control form-control-lg " 
                    placeholder="Employee Name" 
                    name="name"
                    value= {this.state.name}
                    onChange = {this.onChange}
                    />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control form-control-lg " 
                    placeholder="Employee Email" 
                    name="contactEmail"
                    value= {this.state.contactEmail}
                    onChange = {this.onChange}
                    />
                </div>


                <div className="form-group">
                    <input type="number" className="form-control form-control-lg" 
                    placeholder="Employee Phone Number"
                    name="contactNumber"
                    value= {this.state.contactNumber}
                    onChange = {this.onChange}
                    />
                </div>
            
                <input type="submit" value = "Add Employee" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        )
    }
}
export default AddEmployee;