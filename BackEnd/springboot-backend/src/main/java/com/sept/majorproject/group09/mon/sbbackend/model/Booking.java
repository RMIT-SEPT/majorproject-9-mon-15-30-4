package com.sept.majorproject.group09.mon.sbbackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank
    @JsonFormat(pattern = "yyyy-MM-dd@HH:mm:ss.SSSZ") //E.g. 2020-08-17@08:30:00.000+0000
    private Date date;
    @NotBlank
    @Min(value = 20, message = "Duration must be at least 10 minutes")
    @Max(value = 360, message = "Duration must not exceed 6 hours (360 minutes)")
    //This may become redundant depending on design choices i.e. duration could be fetched via service
    private int duration;
    @NotBlank(message = "Must specify a service")
    private long serviceId;
    @NotBlank(message = "Must associate a customer")
    private long customerId;
    @NotBlank(message = "Must associate a employee")
    private long employeeId;

    protected Booking() {

    }

    public Booking(long id, Date date, int duration, long serviceId, long customerId, long employeeId){
        setId(id);
        setDate(date);
        setDuration(duration);
        setServiceId(serviceId);
        setCustomerId(customerId);
        setEmployeeId(employeeId);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public long getServiceId() {
        return serviceId;
    }

    public void setServiceId(long serviceId) {
        this.serviceId = serviceId;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }
}
