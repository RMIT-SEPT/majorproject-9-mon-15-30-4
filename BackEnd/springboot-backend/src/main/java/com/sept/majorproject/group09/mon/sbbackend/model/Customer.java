package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.Entity;

@Entity
public class Customer extends Account {

    private String address;
    private int contactNumber;

    public Customer() {
    }

    public Customer(String name, String password, String userName, String address, int contactNumber) {
        super(name, password, userName);
        this.address = address;
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public int getContactNumber() {
        return contactNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setContactNumber(int contactNumber) {
        this.contactNumber = contactNumber;
    }
}
