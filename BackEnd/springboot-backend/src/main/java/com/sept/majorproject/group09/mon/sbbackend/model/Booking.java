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
    @JsonFormat(pattern ="yyyy-MM-dd HH:mm")
    private Date date;
    @NotBlank
    @Min(value = 20, message = "Duration must be at least 10 minutes")
    @Max(value = 360, message = "Duration must not exceed 6 hours (360 minutes)")
    private int duration;
    @NotBlank(message = "Must specify a service")
    private long serviceId;
    @NotBlank(message = "Must associate a customer")
    private long customerId;
    @NotBlank(message = "Must associate a employee")
    private long employeeId;

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

    public Service getService() {
        return new Service(); //Will retrieve service by stored title
    }

    public Customer getCustomer() {
        return new Customer(); //Will retrieve customer by stored id
    }

    public void setCustomer(long customerId) {
        this.customerId = customerId;
    }

    public Employee getEmployee() {
        return new Employee(); //Will retrieve employee by stored id
    }

    public void setEmployee(long employeeId) {
        this.employeeId = employeeId;
    }
}
