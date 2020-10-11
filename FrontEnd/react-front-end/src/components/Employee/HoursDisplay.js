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
            newEntryActive: false,
            mouseDown: false
        };

        this.loadHours = this.loadHours.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.mouseDownToggle = this.mouseDownToggle.bind(this);
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
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today = new Date(today.getTime() - 1440 * 60000)
                let hoursDate = responseElement["date"].toString().split("-");
                let newDay = new Date(hoursDate[0], hoursDate[1] - 1, hoursDate[2]);
                if(newDay > today)
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
        if(e.target.name !== "timedate")
            this.setState({[e.target.name]: e.target.value});
        else {
            this.blockMouseEnter(e);
            this.setState({time: e.target.value.split("#")[0]});
            this.setState({date: e.target.value.split("#")[1]});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (e.target.name == "newDay") {
            const form = document.getElementById("0");
            let newDay = new Date(form.elements[1].value);
            newDay = new Date(newDay.getTime() - 1440 * 60000);

            let insertHours = [{
                day: 0,
                date: newDay,
                employeeId: this.state.employeeId,
                startTime: 30,
                endTime: 30
            }];
            insertHours = [...insertHours, {
                day: 0,
                date: newDay,
                employeeId: this.state.employeeId,
                startTime: 8.3,
                endTime: 10.3
            }];
            workingHoursService.saveHours(insertHours).then(response => {
                this.loadHours();
            });

            return;
        }

        let blocks = [], blockCluster = [];
        let date = new Date(), dateEndTime = new Date(), interval = 30,
            valueEnd = e.target.value.toString().substring(5, e.target.value.toString().length);
        let dashSplit = e.target.id.toString().split("-"), id = dashSplit[dashSplit.length - 1],
            dateString = valueEnd.substring(1, valueEnd.length).split("-");
        date.setHours(0);
        date.setMinutes(0);
        dateEndTime.setHours(24);
        dateEndTime.setMinutes(0);

        while (date.getTime() + interval * 60000 <= dateEndTime.getTime()) {
            let valueId = (date.getHours().toString().length === 1 ? "0" + date.getHours()
                : date.getHours()) + ":" + (date.getMinutes() === 0 ? "00" :
                date.getMinutes()) + valueEnd, block = document.getElementById(valueId);
            if(block.style.backgroundColor === "rgb(97, 255, 95)") {
                blockCluster = [...blockCluster, block];
            } else {
                if(blockCluster.length !== 0){
                    blocks = [...blocks, blockCluster];
                    blockCluster = [];
                }
            }

            date = new Date(date.getTime() + interval * 60000);
        }

        if(blockCluster.length > 0)
            blocks = [...blocks, blockCluster];

        date.setFullYear(parseInt(dateString[0]));
        date.setMonth(parseInt(dateString[1]) - 1);
        date.setDate(parseInt(dateString[2]));
        date.setHours(0);

        let insertHours = [{
            day: 0,
            date: date,
            employeeId: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + this.state.employeeId,
            startTime: 0,
            endTime: 0
        }];

        if(blocks.length > 0) {
            dashSplit = blocks[0][0].value.toString().split("-");
            id = dashSplit[dashSplit.length - 1];
            dateString = valueEnd.substring(1, valueEnd.length).split("-");
            let timeString, startTime, endTime;
            date.setHours(0);
            date.setFullYear(parseInt(dateString[0]));
            date.setMonth(parseInt(dateString[1]) - 1);
            date.setDate(parseInt(dateString[2]));

            for (let i = 0; i < blocks.length; i++) {
                timeString = blocks[i][0].value.toString().split(":");
                date.setHours(parseInt(timeString[0]));
                date.setMinutes(parseInt(timeString[1]));
                startTime = parseFloat(date.getHours() + "." + date.getMinutes())

                timeString = blocks[i][blocks[i].length - 1].value.toString().split(":");
                date.setHours(parseInt(timeString[0]));
                date.setMinutes(parseInt(timeString[1]));
                date = new Date(date.getTime() + interval * 60000);
                endTime = parseFloat(date.getHours() + "." + date.getMinutes());
                if (endTime == 0)
                    endTime = 24.0;

                const insert = {
                    day: 0,
                    date: date,
                    employeeId: this.state.employeeId,
                    startTime: startTime,
                    endTime: endTime
                }

                insertHours = [...insertHours, insert];
            }
        }

        if (e.target.name == "timedate") {
                workingHoursService.saveHours(insertHours).then(response => {
                    this.loadHours();
                });
        }
    }

    validateForm(id){
        const form = document.getElementById(id);

        if(form !== null) {
            let minDate = new Date();
            form.elements[1].min = minDate.getFullYear() + "-" +
                ((minDate.getMonth() + 1).toString().length == 1 ? "0" + (minDate.getMonth() + 1) : (minDate.getMonth() + 1)) + "-" +
                (minDate.getDate().toString().length == 1 ? "0" + minDate.getDate() : minDate.getDate());
        }
    }

    generateEntryFormNew() {
        let id = 0;
        return <form onSubmit={this.onSubmit} id={id} onChange={this.validateForm(id, false)} name="newDay">
            <br/>
            <h6>New Day</h6>
            <div className="form-group">
                <input type="hidden" name="id" value={id}/>
                <input type="date" className="form-control form-control-lg"
                       name="date"
                       onChange={this.onChange}
                       required
                />
            </div>

            <input type="submit" className="btn btn-primary btn-block mt-4" name="action" value="Submit"/>
            <br/>
        </form>;
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

    createTimeRows(dates, blocks){
        let rows = [];
        for (let i = 0; i < dates.length; i++) {
            rows = [...rows, <tr className="tr-eh"><th className="th-eh">{dates[i]}</th><th className="th-eh">{blocks[i]}</th></tr>]
        }

        if(rows.length === 0)
            rows = <tr className="tr-eh"><th className="th-eh">N/A</th>
                <th className="th-eh">N/A</th></tr>;
        return rows;
    }

    blockTimes(){
        let date, dates = [];

        if(this.state.hours[0] != null) {
            let dateString = this.state.hours[0]["date"].toString().split("-");
            let year = dateString[0], month = dateString[1], day = dateString[2];
            let prevDate = new Date(year, month, day);
            dates = [...dates, month +  "/" + day];

            for (let i = 0; i < this.state.hours.length; i++) {
                dateString = this.state.hours[i]["date"].toString().split("-");
                year = dateString[0];
                month = dateString[1];
                day = dateString[2];
                date = new Date(year, month, day);
                if (date.getFullYear() !== prevDate.getFullYear()
                    || date.getMonth() !== prevDate.getMonth()
                    || date.getDate() !== prevDate.getDate())
                    dates = [...dates, month +  "/" + day];
                prevDate = date;
            }
        }
        return dates;
    }

    createBlocks(){
        let blocks = [];
        if(this.state.hours[0] != null) {
            let dateString = this.state.hours[0]["date"].toString().split("-");
            let year = dateString[0], month = dateString[1], day = dateString[2];
            let date = new Date(year, month, day, 0, 0);

            let buttons = [];

            for (let i = 0; i < this.state.hours.length; i++) {
                let cBR = this.createBlockButton(i, date);
                buttons = cBR[0];

                blocks = [...blocks,
                    <div style={{position : "relative"}}>{buttons}</div>];
                date = new Date(cBR[2].getTime());
                i = cBR[1];
            }

        }

        return blocks;
    }

    createBlockButton(i, prevDate) {
        let dateString = this.state.hours[i]["date"].toString().split("-"), buttons = [],
            interval = 30, year = dateString[0], month = dateString[1], day = dateString[2],
            hour = this.state.hours[i]["startTime"].toString().split(".")[0],
            minute = this.state.hours[i]["startTime"].toString().split(".")[1],
            endHour = this.state.hours[i]["endTime"].toString().split(".")[0],
            endMinute = this.state.hours[i]["endTime"].toString().split(".")[1],
            date = new Date(prevDate.getTime()), dateEndTime = new Date(prevDate.getTime()),
            date2, id = this.state.hours[i]["id"], valueId;
        date.setHours(0);
        date.setMinutes(0);
        dateEndTime.setHours(24);
        dateEndTime.setMinutes(0);

        while (new Date(date.getTime() + interval * 60000) <= dateEndTime) {
            valueId = (date.getHours().toString().length === 1 ? "0" + date.getHours()
                : date.getHours()) + ":" + (date.getMinutes() === 0 ? "00" :
                date.getMinutes()) + "#" + year + "-"
                + (month.toString().length === 1 ? "0" + month : month) + "-"
                + (day.toString().length === 1 ? "0" + day : day) + "-" + id;

            let position = (date.getHours() * 60 + date.getMinutes()) / 1440 * 100 + "%";
            let length = interval / 1440 * 100 + "%";

            date2 = new Date(date.getTime() + interval * 60000);
            buttons = [...buttons, <button className="button-eh" style={{left: position, width: length}}
                                           id={valueId}
                                           name="timedate"
                                           value={valueId}
                                           onMouseEnter={this.onChange}
                                           onMouseOut={this.toggleActive}
                                           onMouseDown={this.mouseDownToggle}
                                           onMouseUp={this.mouseDownToggle}></button>,
                <div className="triangle-up" style={{left: position, visibility: "hidden"}} id={valueId + "T"}>
                    <label className="label-b-d" style={{left: position, visibility: "hidden"}}
                           id={valueId + "D"}>
                        <i>{"Start Time: "}</i><b>{date.getHours() + ":"
                    + (date.getMinutes() === 0 ? "00" : date.getMinutes())}</b><br/>
                        <i>{"End Time: "}</i><b>{valueId + "#" + date2.getHours() + ":"
                    + (date2.getMinutes() === 0 ? "00" : date2.getMinutes())}</b></label></div>];
            date = new Date(date.getTime() + interval * 60000);
        }

        for (; i < this.state.hours.length; i++) {
            dateString = this.state.hours[i]["date"].toString().split("-");
            year = dateString[0];
            month = dateString[1];
            day = dateString[2];
            hour = this.state.hours[i]["startTime"].toString().split(".")[0];
            minute = this.state.hours[i]["startTime"].toString().split(".")[1];
            if(typeof minute === "undefined")
                minute = "0";
            endHour = this.state.hours[i]["endTime"].toString().split(".")[0];
            endMinute = this.state.hours[i]["endTime"].toString().split(".")[1];
            if(typeof endMinute === "undefined")
                endMinute = "0";
            minute = minute.toString().length === 1 ? minute + "0" : minute;
            endMinute = endMinute.toString().length === 1 ? endMinute + "0" : endMinute;

            date = new Date(year, month, day, hour, minute);
            dateEndTime = new Date(year, month, day, endHour, endMinute);

            if (date.getFullYear() !== prevDate.getFullYear()
                || date.getMonth() !== prevDate.getMonth()
                || date.getDate() !== prevDate.getDate())
                break;

            do {
                valueId = (date.getHours().toString().length === 1 ? "0" + date.getHours()
                    : date.getHours()) + ":" + (date.getMinutes() === 0 ? "00" :
                    date.getMinutes()) + "#" + year + "-"
                    + (month.toString().length === 1 ? "0" + month : month) + "-"
                    + (day.toString().length === 1 ? "0" + day : day) + "-" + id;
                if (document.getElementById(valueId) !== null && !this.state.mouseDown) {
                    document.getElementById(valueId).style.backgroundColor = "#61FF5F";
                    document.getElementById(valueId).style.border = "1px solid #4AB848";
                }

                date = new Date(date.getTime() + interval * 60000);
            }while (new Date(date.getTime() + interval * 60000) <= dateEndTime);
        }

        return [buttons, i - 1, date];
    }

    toggleActive(e){
        if(this.state.mouseDown)
        if(e.target.style.backgroundColor === "rgb(97, 255, 95)"){
            e.target.style.backgroundColor = "#FF4F67";
            e.target.style.border = "1px solid #C70039";
        } else {
            e.target.style.backgroundColor = "#61FF5F";
            e.target.style.border = "1px solid #4AB848";
        }
        document.getElementById(e.target.value + "D").style.visibility  = "hidden";
        document.getElementById(e.target.value + "T").style.visibility  = "hidden";
    }

    mouseDownToggle = (e) => {
        if (e.type === "mousedown") {
            this.setState({ mouseDown: true});
        } else if(e.type === "mouseup") {
            this.toggleActive(e);
            this.setState({ mouseDown: false});
            this.onSubmit(e);
        }
    }

    blockMouseEnter(e){
        document.getElementById(e.target.value + "D").style.visibility  = "visible";
        document.getElementById(e.target.value + "T").style.visibility  = "visible";
    }

    render() {
       return (

            <div className="WorkingHours">
                <Container fluid = "md" >

                    <Jumbotron className ="text-auto">

                        <h1>Hours for Employee: {this.state.employeeId}</h1>
                        <label className="label-s-t">Scheduled</label>
                        <span> </span>
                        <label className="label-u-t">Not Scheduled</label>
                        <span> </span>
                        <label>-Hover for details, Click (and drag) to toggle.</label>
                        <div>

                            <table className="table-eh" id="schedule">
                                <colgroup>
                                    <col span="1" style={{width : "7%"}}/>
                                    <col span="1" style={{width : "93%"}}/>
                                </colgroup>
                                <thead>
                                <tr className="tr-eh">
                                    <th className="th-eh" style={{backgroundColor: "#343A40", color: "#A6A6A6"}}>Date</th>
                                    <th className="th-eh" style={{backgroundColor: "#343A40", color: "#A6A6A6"}}>
                                        <div className="container-t" style={{display : "flex"}}>
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

                        {this.generateEntryFormNew()}

                    </Jumbotron>

                </Container>
            </div>
        )
    }
}

export default HoursDisplay;