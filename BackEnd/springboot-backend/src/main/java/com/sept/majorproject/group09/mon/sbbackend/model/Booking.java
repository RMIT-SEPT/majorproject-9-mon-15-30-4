package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Booking
{

    //TODO IS A Placeholder please replace
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String customerUsername;
    private String employeeUsername;


    public Booking() {
    }

    public Booking(String customerUsername, String employeeUsername) {
        this.customerUsername = customerUsername;
        this.employeeUsername = employeeUsername;
    }
}
