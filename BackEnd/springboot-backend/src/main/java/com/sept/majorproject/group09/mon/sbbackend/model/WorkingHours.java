package com.sept.majorproject.group09.mon.sbbackend.model;

import com.sun.xml.internal.ws.api.pipe.FiberContextSwitchInterceptor;

import java.util.Date;

public class WorkingHours {
    enum DayOfWeek {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    private double startTime, endTime;
    private Date date;
    private DayOfWeek day;
    public WorkingHours(double startTime, double endTime, Date date,DayOfWeek day){
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.day = day;
    }

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
