import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import workingHoursService from "../../services/workingHoursService";
import {Container, Form, Jumbotron} from "react-bootstrap";
import "./Hours.css";
import loginService from "../../services/loginService";

class HoursDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: "",
            hours: [],
            employeeId: "Jim_User",
            newEntryActive: false
        };

        this.loadHours = this.loadHours.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    componentDidMount() {
        this.loadHours();
    }

    loadHours() {
        this.setState({hours: []});
        workingHoursService.getById(this.state.employeeId).then(response => {
            for (const responseElement of response["data"]) {
                let today = new Date();
                let hoursDate = responseElement["date"].toString().split("-");
                if(parseInt(hoursDate[0]) >= today.getFullYear() && parseInt(hoursDate[1]) >= today.getMonth() + 1
                    && hoursDate[2] >= today.getDate())
                this.setState({
                    hours: [...this.state.hours,
                        responseElement]
                });
            }
        }).catch(e => {
            console.log(e);
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.action === "Submit" && this.validateForm(e.target.id.value, true)) {
            let startTime = e.target.startTime.value.toString().split(":");
            let endTime = e.target.endTime.value.toString().split(":");
            const newHours = {
                id: e.target.id.value,
                day: 0,
                date: e.target.date.value,
                employeeId: this.state.employeeId,
                startTime: parseFloat(startTime[0] + "." + startTime[1]),
                endTime: parseFloat(endTime[0] + "." + endTime[1])
            }
            workingHoursService.saveHours(newHours).then(response => {
                this.setState({newEntryActive: false});
                this.loadHours();
            });

            if(e.target.id.value === "0"){
                const form = document.getElementById(e.target.id.value);
                form["date"].value = null;
                form.elements[2]["value"] = null;
                form.elements[3]["value"] = null;
            }
        } else if (this.state.action === "Delete") {
            workingHoursService.deleteById(e.target.id.value).then(response => {
                this.loadHours();
            });
        }
    }

    validateForm(id, rt){
        const form = document.getElementById(id);

        if(form !== null)
            if (form.elements[2]["value"] /*start time*/ < form.elements[3]["value"] /*end time*/) {
                form.elements[2].setCustomValidity("");
                if(rt)
                return true;
            } else {
                form.elements[2].setCustomValidity("Start time must preceed end time,");
                if(rt)
                return false;
            }
    }

    confirmTimeslot(date, serviceId, employeeId) {
        return bookingService.checkAvailable(date, serviceId, employeeId);
    }

    formatWorkHours() {
        let formattedString = "Working Hours: \n";
        for (const element of this.state.hours) {
            formattedString += element["day"] + ", " + element["date"] + ", "
                + this.doubleToTimeString(element["startTime"]) + " - "
                + this.doubleToTimeString(element["endTime"]) + "\n";
        }
        return formattedString;
    }

    doubleToTimeString(double) {
        let time = double.toString().split(".");
        return time[0] + ":" + (time[1] != null ? time[1] + (time[1].length === 1 ? "0" : "") : "00");
    }

    formatAvailableTimes() {
        let formattedString = "Available Times: \n";
        for (const element of this.state.hours) {
            formattedString += element[3] + "/" + element[2] + "/" + element[1] + ", "
                + element[4] + ":" + element[5] + " - " + element[6] + ":" + element[7]
                + "\n";
        }
        return formattedString;
    }

    generateEntryForm(id, date, startTime, endTime) {
        let sTime = startTime.toString().split(".");
        let eTime = endTime.toString().split(".");

        return <form onSubmit={this.onSubmit} key={id} id={id} onChange={this.validateForm(id, false)}>
            <h6>Date</h6>
            <div className="form-group">
                <input type="hidden" name="id" value={id}/>
                <input type="date" className="form-control form-control-lg"
                       name="date"
                       defaultValue={date}
                       onChange={this.onChange}
                       required
                />
            </div>
            <h6>Start Time</h6>
            <div className="form-group">
                <input type="time" className="form-control form-control-lg"
                       name="startTime"
                       defaultValue={(sTime[0].length === 1 ? "0" + sTime[0] : sTime[0]) + ":" + (sTime[1] != null ? sTime[1]
                           + (sTime[1].length === 1 ? "0" : "") : "00")}
                       step="900"
                       onChange={this.onChange}
                       required
                />
            </div>
            <h6>End Time</h6>
            <div className="form-group">
                <input type="time" className="form-control form-control-lg"
                       name="endTime"
                       defaultValue={(eTime[0].length === 1 ? "0" + eTime[0] : eTime[0]) + ":" + (eTime[1] != null ? eTime[1]
                           + (eTime[1].length === 1 ? "0" : "") : "00")}
                       step="900"
                       onChange={this.onChange}
                       required
                />
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4" name="action" value="Submit"
                   onClick={() => this.setState({action: "Submit"})}/>
            <input type="submit" className="btn btn-primary btn-block mt-4" value="Delete"
                   onClick={() => this.setState({action: "Delete"})}/>
            <br/>
        </form>;
    }

    generateEntryFormNew() {
        let id = 0;
        return <form onSubmit={this.onSubmit} id={id} onChange={this.validateForm(id, false)}
                     style={this.state.newEntryActive === false ? {display: "none"} : {display: "block"}}>
            <h6>New Time Frame</h6>
            <h6>Date</h6>
            <div className="form-group">
                <input type="hidden" name="id" value={id}/>
                <input type="date" className="form-control form-control-lg"
                       name="date"
                       onChange={this.onChange}
                       required
                />
            </div>
            <h6>Start Time</h6>
            <div className="form-group">
                <input type="time" className="form-control form-control-lg"
                       name="startTime"
                       step="900"
                       onChange={this.onChange}
                       required
                />
            </div>
            <h6>End Time</h6>
            <div className="form-group">
                <input type="time" className="form-control form-control-lg"
                       name="endTime"
                       step="900"
                       onChange={this.onChange}
                       required
                />
            </div>
            <input type="submit" className="btn btn-primary btn-block mt-4" name="action" value="Submit"
                   onClick={() => this.setState({action: "Submit"})}/>
            <br/>
        </form>;
    }

    generateScheduleTimes(size) {
        let times = [];
        let hours;
        let minutes;

        for (let i = 0; i < 1440; i += size) {
            hours = parseInt(i / 60);
            minutes = i % 60 === 0 ? "00" : i % 60;
            let time = hours + ":" + minutes;
            times = [...times, <div id={time + ":" + i}>{time}</div>];
        }

        return times;
    }

    createPeriodPairs(){
        let pair = [];

        for (const element of this.state.hours) {
            console.log(element["startTime"])
            let sTS = element["startTime"].toString().split(".");
            let eTS = element["endTime"].toString().split(".");
            console.log(sTS[0])
            console.log(sTS[1])

            let interval = 30, startTime = parseInt(sTS[0]) * 60 + parseInt(sTS[1]),
                endTime = parseInt(eTS[0]) * 60 + parseInt(eTS[1]), day = 1440;
            let startWidth = (endTime - interval)/day*100, endWidth = 100 - ((startTime + interval)/day) * 100;
            pair = [...pair, <tr><th>
                <pre>{element["date"]}</pre>
            </th><th>
                <div>
                    <input type="range" id={element["date"] + "#start"} min="0" max={endTime - interval} className="slider-eh-left"
                           defaultValue={startTime} onChange={this.changePeriod} step="30" style={{width: startWidth + "%"}}/>
                    <input type="range" id={element["date"] + "#end"} min={startTime + interval} max="1440" className="slider-eh-right"
                           defaultValue={endTime} onChange={this.changePeriod} step="30" style={{width: endWidth + "%"}}/>
                </div></th></tr>];
        }

        return pair;
    }

    changePeriod(e){
        let period = e.target.id.toString().split("#");
        let correspondent;
        console.log(e.target.id)

        if(period[1] === "start"){
            correspondent = document.getElementById(period[0] + "#end");
            let interval = 30, startTime = parseInt(e.target.value), day = 1440;
            let endWidth = 100 - ((startTime + interval)/day) * 100;
            correspondent.style.width = endWidth + "%";
            correspondent.min = startTime + interval;
        } else {
            correspondent = document.getElementById(period[0] + "#start");
            let interval = 30, endTime = parseInt(e.target.value), day = 1440;
            let startWidth = (endTime - interval)/day*100;
            correspondent.style.width = startWidth + "%";
            correspondent.max = endTime - interval;
        }

        console.log("Time:" + (document.getElementById(period[0] + "#start")).value + " - "
            + (document.getElementById(period[0] + "#end")).value)
    }

    render() {
        let workHours = this.formatWorkHours();
        let entryForms = [this.generateEntryFormNew()];

        for (const element of this.state.hours) {
            entryForms = [...entryForms, this.generateEntryForm(element["id"], element["date"],
                element["startTime"], element["endTime"])];
        }

        return (

            <div className="WorkingHours">
                <Container fluid = "md" >

                    <Jumbotron className ="text-auto">

                        <h1>Hours for Employee: {this.state.employeeId}</h1>
                        <p>
                            info...
                        </p>

                        {/*<Form onSubmit = {this.onSubmit}>*/}
                        {/*    <Form.Group controlId = "formBooking">*/}
                        {/*        <Form.Label>*/}
                        {/*            Service*/}
                        {/*        </Form.Label>*/}
                        {/*        <div className="form-group">*/}
                        {/*            {serviceSelect}*/}
                        {/*        </div>*/}

                        {/*        <Form.Label>*/}
                        {/*            Employee*/}
                        {/*        </Form.Label>*/}
                        {/*        <div className="form-group">*/}
                        {/*            {employeeSelect}*/}
                        {/*        </div>*/}
                        {/*        <label className="label-a-t">Available Times</label>*/}
                        {/*        <span> </span><label className="label-bp">-Hover for details, Click to book.</label>*/}
                        {/*    </Form.Group>*/}
                        {/*</Form>*/}

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
                                        <div className="container space-between" style={{display : "flex"}}>
                                            {this.generateScheduleTimes(120)}
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.createPeriodPairs()}
                                </tbody>
                            </table>
                        </div>

                    </Jumbotron>

                </Container>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center"> Working Hours</h5>
                            <hr/>
                            <pre>{workHours}</pre>
                            <button type="submit" className="btn btn-primary btn-block mt-4" value="New"
                                    onClick={() => this.setState({newEntryActive: true})}
                                    disabled={this.state.newEntryActive}
                                    style={this.state.newEntryActive === true ? {display: "none"} : {display: "block"}}>New
                            </button>
                            <br/>
                            {entryForms}
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HoursDisplay;