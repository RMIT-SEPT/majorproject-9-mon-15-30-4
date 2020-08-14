package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.Entity;

@Entity
public class Employee extends Account
{

    public Employee()
    {

    }

    public Employee(String name, String password, String userName) {
        super(name, password, userName);
    }
}
