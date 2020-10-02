import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import servicesService from "../../services/servicesService";
import employeeService from "../../services/employeeService";

import "./Booking.css";
import {Container, Form, Jumbotron} from "react-bootstrap";

class AddBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            time: "",
            serviceId: "",
            employeeId: "",
            services: [],
            employees: [],
            availableTimes: [],
            servicePlaceholder: "Select a service.",
            employeePlaceholder: "Select a employee.",
            serviceSelected: false,
            serviceDuration: 0,
            employeeSelected: false,
            dateSelected: false,
            timeSelected: false
        };

        this.updateBookingFields = this.updateBookingFields.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        this.updateBookingFields();
    }

    /*
     * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
     * User: TLindig
     */
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    updateBookingFields() 
    {
        servicesService.getAll()
            .then(response => 
            {
                for (const responseElement of response["data"]) 
                {
                    servicesService.getById(responseElement["id"]).then(response => 
                    {
                        this.setState(
                        {
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

    onChange(e) {
        if(e.target.name !== "timedate")
            this.setState({[e.target.name]: e.target.value});
        else {
            this.blockMouseEnter(e);
            this.setState({time: e.target.value.split("#")[0]});
            this.setState({date: e.target.value.split("#")[1]});
        }

        if (e.target.name === "serviceId") {
            this.updateEmployees(e.target.value);
            servicesService.getByName(e.target.value).then(response => {
                this.setState({serviceDuration: response["data"][0]["duration"]});
            }).catch(e => {
                console.log(e);
            });
        }

        if (this.state.serviceId !== "")
            if (e.target.name === "employeeId" && e.target.value !== this.state.employeePlaceholder) {
                this.setState({employeeSelected: true});
                bookingService.getByEmployee(e.target.value.split("#")[1]).then(response => {
                    for (const responseElement of response["data"]) {
                        this.setState({
                            availableTimes: [...this.state.availableTimes,
                                responseElement]
                        });
                    }
                }).catch(e => {
                    console.log(e);
                });
            }

        if(e.target.name === "employeeId")
            this.setState({availableTimes: []});

        if (e.target.value === this.state.employeePlaceholder)
            this.setState({employeeSelected: false});

        if (e.target.value === this.state.servicePlaceholder) {
            this.setState({employeeId: ""});
            this.setState({employeeSelected: false});
            this.setState({employees: []});
            this.setState({serviceSelected: false});
            this.setState({serviceDuration: 0});
        }

        if (e.target.name === "date")
            this.setState({dateSelected: true});
        if (e.target.name === "time")
            this.setState({timeSelected: true});
    }

    updateEmployees(name) {
        this.setState({employees: []});
        servicesService.getByName(name)
            .then(response => {
                for (const responseElement of response["data"]) {
                    employeeService.getByUserName(responseElement["employeeId"])
                        .then(response => {
                            this.setState({
                                employees: [...this.state.employees,
                                    response["data"]["name"] + " #" + response["data"]["userName"]]
                            });
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
        this.setState({employeeId: ""});
        this.setState({employeeSelected: false});
        this.setState({availableTimes: []});
    }

    onSubmit(e) {
        e.preventDefault();
        servicesService.getByEmployeeAndName(
            this.state.employeeId.split("#")[1],
            this.state.serviceId).then(response => {
            const newBooking = {
                customerId: "1",
                date: this.state.date + "@" + this.state.time + ":00.000+1000",
                serviceId: response["data"]["id"],
                employeeId: this.state.employeeId.split("#")[1]
            }
            this.confirmTimeslot(newBooking.date, newBooking.serviceId,
                newBooking.employeeId).then(response => {
                if(response["data"]) {
                    bookingService.create(newBooking);
                    this.resetForm();
                }
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            console.log(e);
        });
    }

    confirmTimeslot(date, serviceId, employeeId){
        return bookingService.checkAvailable(date, serviceId, employeeId);
    }

    resetForm(){
        this.setState({serviceId: ""});
        this.setState({employeeId: ""});
        this.setState({date: ""});
        this.setState({time: ""});
        this.setState({serviceSelected: false});
        this.setState({service: ""});
        this.setState({employeeSelected: false});
        this.setState({dateSelected: false});
        this.setState({timeSelected: false});
        this.setState({availableTimes: []});
    }

    makeOption = function (X) {
        return <option key={"itemId" + X}>{X}</option>;
    };

    formatAvailableTimes() {
        let formattedString = "Available Times: \n";
        for (const element of this.state.availableTimes) {
            formattedString += element[3] + "/" + element[2] + "/" + element[1] + ", "
                + element[4] + ":" + element[5] + " - " + element[6] + ":" + element[7]
                + "\n";
        }
        return formattedString;
    }

    generateScheduleTimes(size) {
        let times = [];
        let hours;
        let minutes;

        for (let i = 0; i < 1500; i += size) {
            hours = parseInt(i / 60);
            minutes = i % 60 === 0 ? "00" : i % 60;
            let time = hours + ":" + minutes;
            times = [...times, <div id={time + ":" + i}>{time}</div>];
        }

        return times;
    }

    blockTimes(){
        let date, dates = [];
        if(this.state.availableTimes[0] != null) {
            let year = this.state.availableTimes[0][1], month = this.state.availableTimes[0][2],
                day = this.state.availableTimes[0][3];
            let prevDate = new Date(year, month, day);
            dates = [...dates, month +  "/" + day];

            for (let i = 0; i < this.state.availableTimes.length; i++) {
                let year = this.state.availableTimes[i][1], month = this.state.availableTimes[i][2],
                    day = this.state.availableTimes[i][3], hour = this.state.availableTimes[i][4],
                    minute = this.state.availableTimes[i][5];
                date = new Date(year, month, day, hour, minute);
                if (date.getFullYear() !== prevDate.getFullYear()
                    || date.getMonth() !== prevDate.getMonth()
                    || date.getDay() !== prevDate.getDay())
                    dates = [...dates, month +  "/" + day];
                prevDate = date;
            }
        }
        return dates;
    }

    createBlocks(){
        let blocks = [];
        if(this.state.availableTimes[0] != null) {
            let year = this.state.availableTimes[0][1], month = this.state.availableTimes[0][2],
                day = this.state.availableTimes[0][3];
            let date = new Date(year, month, day);

            let buttons = [];

            for (let i = 0; i < this.state.availableTimes.length; i++) {
                let cBR = this.createBlockButton(i, date);
                buttons = cBR[0];

                blocks = [...blocks,
                    <div style={{position : "relative"}}>{buttons}</div>];
                date = cBR[2];
                i = cBR[1];
            }

        }
        return blocks;
    }

    createBlockButton(i, prevDate) {
        let buttons = [], date, dateEndTime;

        for (; i < this.state.availableTimes.length; i++) {
            let year = this.state.availableTimes[i][1], month = this.state.availableTimes[i][2],
                day = this.state.availableTimes[i][3], hour = this.state.availableTimes[i][4],
                minute = this.state.availableTimes[i][5], endHour = this.state.availableTimes[i][6],
                endMinute = this.state.availableTimes[i][7];
            date = new Date(year, month, day, hour, minute);
            dateEndTime = new Date(year, month, day, endHour, endMinute);
            if (date.getFullYear() !== prevDate.getFullYear()
                || date.getMonth() !== prevDate.getMonth()
                || date.getDay() !== prevDate.getDay())
                break;

            while (new Date(date.getTime() + this.state.serviceDuration * 60000) <= dateEndTime) {
                let position = (date.getHours() * 60 + date.getMinutes()) / 1440 * 100 + "%";
                let length = this.state.serviceDuration / 1440 * 100 + "%";
                let valueId = (date.getHours().toString().length === 1 ? "0" + date.getHours()
                    : date.getHours()) + ":" + (date.getMinutes() === 0 ? "00" :
                    date.getMinutes()) + "#" + year + "-"
                    + (month.toString().length === 1 ? "0" + month : month) + "-"
                    + (day.toString().length === 1 ? "0" + day : day);
                buttons = [...buttons, <button className="button-bp" style={{left: position, width: length}}
                                               id={valueId}
                                               name="timedate"
                                               value={valueId}
                                               onMouseEnter={this.onChange}
                                               onMouseOut={this.blockMouseOut}
                                               onClick={this.onSubmit}></button>,
                    <div className="triangle-up" style={{left: position, visibility: "hidden"}} id={valueId + "T"}>
                        <label className="label-b-d" style={{left: position, visibility: "hidden"}}
                           id={valueId + "D"}>
                        <i>{"Start Time: "}</i><b>{date.getHours() + ":"
                    + (date.getMinutes() === 0 ? "00" : date.getMinutes())}</b><br/>
                        <i>{"Duration: "}</i><b>{this.state.serviceDuration + " minutes"}</b><br/>
                        <i>{"With: "}</i><b>{this.state.employeeId}</b></label></div>];
                date = new Date(date.getTime() + this.state.serviceDuration * 60000);
            }
        }
        return [buttons, i - 1, date];
    }

    createTimeRows(dates, blocks){
        let rows = [];
        for (let i = 0; i < dates.length; i++) {
            rows = [...rows, <tr className="tr-bp"><th className="th-bp">{dates[i]}</th><th className="th-bp">{blocks[i]}</th></tr>]
        }

        if(rows.length === 0)
            rows = <tr className="tr-bp"><th className="th-bp">N/A</th>
                <th className="th-bp">N/A</th></tr>;
        return rows;
    }

    blockMouseEnter(e){
        document.getElementById(e.target.value + "D").style.visibility  = "visible";
        document.getElementById(e.target.value + "T").style.visibility  = "visible";
    }

    blockMouseOut(e) {
        document.getElementById(e.target.value + "D").style.visibility  = "hidden";
        document.getElementById(e.target.value + "T").style.visibility  = "hidden";
    }

    render() {
        const services = this.state.services
            .filter((v, i, a) => a.indexOf(v) === i)
            .toString().split(",");
        let serviceSelect = <Form.Control as="select"
                                    name="serviceId"
                                    value={this.state.serviceId}
                                    onChange={this.onChange}>
            <option default>{this.state.servicePlaceholder}</option>
            {services.map(this.makeOption)}</Form.Control>;

        const employees = this.state.employees.toString().split(",");
        let employeeSelect = <Form.Control as="select"
                                     name="employeeId"
                                     value={this.state.employeeId}
                                     onChange={this.onChange}
                                     disabled={!this.state.serviceSelected}>
            <option default>{this.state.employeePlaceholder}</option>
            {employees.map(this.makeOption)}</Form.Control>;

        return (
            <div className="Booking">
                    <Container fluid = "md" >

                        <Jumbotron className ="text-auto">

                            <h1>Create Booking</h1>
                            <p>
                                Enter your require service, preferred employee and select a available time-block.
                            </p>
                            <p>
                                If no times appear, please try another employee.
                            </p>

                            <Form onSubmit = {this.onSubmit}>
                                <Form.Group controlId = "formBooking">
                                    <Form.Label>
                                        Service
                                    </Form.Label>
                                    <div className="form-group">
                                        {serviceSelect}
                                    </div>

                                    <Form.Label>
                                        Employee
                                    </Form.Label>
                                    <div className="form-group">
                                        {employeeSelect}
                                    </div>
                                    <label className="label-a-t">Available Times</label>
                                    <span> </span><label className="label-bp">-Hover for details, Click to book.</label>
                                </Form.Group>
                            </Form>

                            <div>

                            <table className="table-bp" id="schedule">
                                <colgroup>
                                    <col span="1" style={{width : "7%"}}/>
                                    <col span="1" style={{width : "93%"}}/>
                                </colgroup>
                                <thead>
                                <tr className="tr-bp">
                                    <th className="th-bp" style={{backgroundColor: "#343A40", color: "#A6A6A6"}}>Date</th>
                                    <th className="th-bp" style={{backgroundColor: "#343A40", color: "#A6A6A6"}}>
                                        <div className="container-t">
                                            {this.generateScheduleTimes(120)}
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.createTimeRows(this.blockTimes(), this.createBlocks())}
                                </tbody>
                            </table>
                            </div>

                        </Jumbotron>

                    </Container>
            </div>
        )
    }
}

export default AddBooking;