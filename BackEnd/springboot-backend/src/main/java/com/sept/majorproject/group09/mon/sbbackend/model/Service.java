package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public Service() {
    }

    public long getId() {
        return id;
    }
}
