package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.Entity;

@Entity
public class Admin extends Account
{
    public Admin() {
    }

    public Admin(String name, String password, String userName) {
        super(name, password, userName);
    }
}
