package com.sept.majorproject.group09.mon.sbbackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class WorkingHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @NotBlank(message = "Must associate a employee")
    private String employeeId;

    public WorkingHours() {

    }

    public long getId() {
        return id;
    }

    public enum DayOfWeek {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    private double startTime, endTime;
    @JsonFormat(pattern = "yyyy-MM-dd") //E.g. 2020-08-17
    private Date date;
    private DayOfWeek day;
    public WorkingHours(String employeeId, double startTime, double endTime, Date date, DayOfWeek day){
        this.employeeId = employeeId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.day = day;
    }

    public String getEmployeeId() { return employeeId; }

    public double getStartTime() {
        return startTime;
    }

    public double getEndTime() {
        return endTime;
    }

    public DayOfWeek getDay() {
        return day;
    }

    public Date getDate() {
        return date;
    }
}
