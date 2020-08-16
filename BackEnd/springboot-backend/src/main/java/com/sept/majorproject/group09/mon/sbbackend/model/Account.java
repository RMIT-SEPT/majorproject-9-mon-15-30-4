package com.sept.majorproject.group09.mon.sbbackend.model;

import com.sun.javafx.beans.IDProperty;

import javax.persistence.*;


//@Entity
/*
 * If Entity is commented out, then it cannot be seen within the H2 console/database.
 * Lack of Account within database - good or bad? Cannot interact with it - may be good?
 */
@Inheritance(strategy = InheritanceType.JOINED)
public  abstract class Account {

    @Id
    private String userName;
    private String name;
    private String password;

    public Account()
    {}

    public Account(String nameInput, String passwordInput, String userNameInput)
    {
        this.name = nameInput;
        this.password = passwordInput;
        this.userName = userNameInput;
    }

    public void setName(String nameInput)
    {
        this.name=nameInput;
    }

    public void setPassword(String passwordInput)
    {
        this.password = passwordInput;
    }

    public void setUserName(String usernameInput)
    {
        this.userName = usernameInput;
    }

    public String getName()
    {
        return this.name;
    }

    public String getUserName()
    {
        return this.userName;
    }

    //Returns true if the passwords match.

    public boolean checkHashedPassword(String passwordInput)
    {
        boolean passwordMatch = false;

        if(passwordInput.equals(this.password))
        {
            passwordMatch = true;
        }

        return passwordMatch;
    }







}
