import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import workingHoursService from "../../services/workingHoursService";

class HoursDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: "",
            hours: [],
            employeeId: "1"
        };

        this.loadHours = this.loadHours.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    componentDidMount() {
        this.loadHours();
    }

    loadHours() {
        workingHoursService.getById("1").then(response => {
            console.log(response);
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

    /*
     * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
     * User: TLindig
     */
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.name);
    }

    onSubmit(e) {
        e.preventDefault();

        let startTime = e.target.startTime.value.toString().split(":");
        let endTime = e.target.endTime.value.toString().split(":");

        if(this.state.action === "Submit"){
            const newHours = {
                id: e.target.id.value,
                day: 0,
                date: e.target.date.value,
                employeeId: this.state.employeeId,
                startTime: parseFloat(startTime[0] + "." + startTime[1]),
                endTime: parseFloat(endTime[0] + "." + endTime[1])
            }
            workingHoursService.saveHours(newHours);
        } else if(this.state.action === "Delete"){
            workingHoursService.deleteById(e.target.id.value);
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

        return <form onSubmit={this.onSubmit}>
            <h6>Date</h6>
            <div className="form-group">
                <input type="hidden" name="id" value={id}/>
                <input type="date" className="form-control form-control-lg"
                       name="date"
                       defaultValue={date}
                       onChange={this.onChange}
                       onSubmit={this.onChange}
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
                            {entryForms}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HoursDisplay;