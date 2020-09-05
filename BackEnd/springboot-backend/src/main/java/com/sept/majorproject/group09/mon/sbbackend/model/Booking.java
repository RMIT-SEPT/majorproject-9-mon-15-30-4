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
    @NotBlank(message = "Must specify a service")
    private long serviceId;
    @NotBlank(message = "Must associate a customer")
    private String customerId;
    @NotBlank(message = "Must associate a employee")
    private String employeeId;

    protected Booking() {

    }

    public Booking(long id, Date date, long serviceId, String customerId, String employeeId){
        setId(id);
        setDate(date);
        setServiceId(serviceId);
        setCustomerId(customerId);
        setEmployeeId(employeeId);
    }

    public Booking(Date date, long serviceId, String customerId, String employeeId) {
        setDate(date);
        setServiceId(serviceId);
        setCustomerId(customerId);
        setEmployeeId(employeeId);
    }

    public Booking(Date date, long serviceId) {
        setDate(date);
        setServiceId(serviceId);
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

    public long getServiceId() {
        return serviceId;
    }

    public void setServiceId(long serviceId) {
        this.serviceId = serviceId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}
