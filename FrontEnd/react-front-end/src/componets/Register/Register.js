import React, { Component } from 'react';
import "./Register.css";
import registerService from "../../Services/registerService.js";

class Register extends Component {
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

        
        registerService.checkDetails(newAccount.userName, newAccount.password, newAccount.name, newAccount.contactEmail, newAccount.contactNumber)
            .then(response => {
                console.log(response);
                console.log(e);
                console.log();
            })
            .catch(e => {
                console.log(e);
                console.log();
            });
    }


    render() {
        return (

        <div className="container"> 
            <div className="form-popup">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Register</h5>
                    <hr />

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg " 
                            placeholder="Username" 
                            name="userName"
                            value= {this.state.userName}
                            onChange = {this.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control form-control-lg " 
                            placeholder="Enter Password" 
                            name="password"
                            value= {this.state.password}
                            onChange = {this.onChange}
                            />
                        </div>


                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg " 
                            placeholder="Name" 
                            name="name"
                            value= {this.state.name}
                            onChange = {this.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg " 
                            placeholder="Email" 
                            name="contactEmail"
                            value= {this.state.contactEmail}
                            onChange = {this.onChange}
                            />
                        </div>

     
                        <div className="form-group">
                            <input type="number" className="form-control form-control-lg" 
                            placeholder="Phone Number"
                            name="contactNumber"
                            value= {this.state.contactNumber}
                            onChange = {this.onChange}
                            />
                        </div>
                    
                        <input type="submit" value = "Register" className="btn btn-primary btn-block mt-4" />


                    </form>


                </div>
            </div>


        </div>
        )
    }
}


export default Register