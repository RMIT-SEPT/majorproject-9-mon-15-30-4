package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Size(min=2, max =250, message = "please enter 2 to 250 characters")
    private String name;
    @Min(value = 20, message = "Duration must be at least 10 minutes")
    @Max(value = 360, message = "Duration must not exceed 6 hours (360 minutes)")
    private int duration;
    private String description;
    @NotNull(message = "Must associate a employee")
    private String employeeId;

    protected Service() {
    }

    public Service(long id, String name, int duration, String description, String employeeId){
        setId(id);
        setName(name);
        setDuration(duration);
        setDescription(description);
        setEmployeeId(employeeId);
    }

    public Service(String name, int duration, String description, String employeeId){
        setName(name);
        setDuration(duration);
        setDescription(description);
        setEmployeeId(employeeId);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}
