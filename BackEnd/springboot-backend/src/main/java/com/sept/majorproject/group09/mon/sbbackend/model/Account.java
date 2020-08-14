package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.*;


@Entity
@Inheritance( strategy = InheritanceType.JOINED)
public abstract class Account
{
    @Id
    private String userName;
    
    private String name;
    private String password;

    public Account()
    {

    }

    public Account(String name, String password, String userName) {
        this.name = name;
        this.password = password;
        this.userName = userName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }


    //Returns true if the passwords match.
    // The password should never be passed up the chain hence the need to check it in the class
    public boolean checkHashedPassword(String password)
    {
        return this.password == password;
    }


    public String getUserName() {
        return userName;
    }
}