import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import workingHoursService from "../../services/workingHoursService";

class HoursDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: "",
            hours: [],
            employeeId: "1",
            newEntries: [],
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
        workingHoursService.getById("1").then(response => {
            for (const responseElement of response["data"]) {
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

        let startTime = e.target.startTime.value.toString().split(":");
        let endTime = e.target.endTime.value.toString().split(":");

        if (this.state.action === "Submit") {
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
                this.setState({newEntries: []});
                this.loadHours();
            });
        } else if (this.state.action === "Delete") {
            workingHoursService.deleteById(e.target.id.value).then(response => {
                this.loadHours();
            });
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

        return <form onSubmit={this.onSubmit} key={id}>
            <h6>Date</h6>
            <div className="form-group">
                <input type="hidden" name="id" value={id}/>
                <input type="date" className="form-control form-control-lg"
                       name="date"
                       defaultValue={date}
                       onChange={this.onChange}
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
        this.setState({
            newEntryActive:
                true
        })
        this.setState({
            newEntries:
                <form onSubmit={this.onSubmit}>
                    <h6>New Time Frame</h6>
                    <h6>Date</h6>
                    <div className="form-group">
                        {/*<input type="hidden" name="id" value={id}/>*/}
                        <input type="date" className="form-control form-control-lg"
                               name="date"
                               onChange={this.onChange}
                        />
                    </div>
                    <h6>Start Time</h6>
                    <div className="form-group">
                        <input type="time" className="form-control form-control-lg"
                               name="startTime"
                               step="900"
                               onChange={this.onChange}
                        />
                    </div>
                    <h6>End Time</h6>
                    <div className="form-group">
                        <input type="time" className="form-control form-control-lg"
                               name="endTime"
                               step="900"
                               onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary btn-block mt-4" name="action" value="Submit"
                           onClick={() => this.setState({action: "Submit"})}/>
                    <br/>
                </form>
        });
    }

    render() {
        let workHours = this.formatWorkHours();
        let entryForms = [];

        for (const element of this.state.hours) {
            entryForms = [...entryForms, this.generateEntryForm(element["id"], element["date"],
                element["startTime"], element["endTime"])];
        }

        return (
            <div className="WorkingHours">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center"> Working Hours</h5>
                            <hr/>
                            <pre>{workHours}</pre>
                            <button type="submit" className="btn btn-primary btn-block mt-4" value="New"
                                    onClick={() => this.generateEntryFormNew()}
                                    disabled={this.state.newEntryActive}
                                    style={this.state.newEntryActive === true ? {display: "none"} : {display: "block"}}>New
                            </button>
                            {this.state.newEntries}
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