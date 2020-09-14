import React, {Component} from "react";
import bookingService from "../../services/bookingService";
import servicesService from "../../services/servicesService";
import employeeService from "../../services/employeeService";
import workingHoursService from "../../services/workingHoursService";

class HoursDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: []
        };

        this.loadHours = this.loadHours.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



    }

    componentDidMount() {
        this.loadHours();
    }

    loadHours(){
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

    }


    onSubmit(e) {
        e.preventDefault();

    }

    confirmTimeslot(date, serviceId, employeeId){
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
        return time[0] + ":" + (time[1] != null ? time[1] + (time[1].length == 1 ? "0" : "") : "00");
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

    render() {
        let workHours = this.formatWorkHours();

        return (
            <div className="WorkingHours">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center"> Working Hours</h5>
                            <hr/>
                            <pre>{workHours}</pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HoursDisplay;