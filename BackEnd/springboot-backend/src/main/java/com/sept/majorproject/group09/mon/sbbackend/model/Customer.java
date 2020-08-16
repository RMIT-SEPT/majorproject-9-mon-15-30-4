package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public Customer() {
    }

    public long getId() {
        return id;
    }
}
