package com.sept.majorproject.group09.mon.sbbackend.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@MappedSuperclass
public abstract class Account
{
    @Id
    @NotBlank(message = "Username MUST be entered")
    @Column(unique = true, nullable = false) //A command that allows only one creation of unique username
    private String userName;

    @NotBlank(message = "The individual's name MUST be entered")
    @NotNull
    private String name;

    @NotBlank(message = "The individual's password MUST be entered")
    @NotNull
    private String password;

    public Account() { }

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

    public String getUserName() {
        return userName;
    }


    //Returns true if the passwords match.
    // The password should never be passed up the chain hence the need to check it in the class
    public boolean checkHashedPassword(String password)
    {
        return this.password.matches(password);
    }




}
