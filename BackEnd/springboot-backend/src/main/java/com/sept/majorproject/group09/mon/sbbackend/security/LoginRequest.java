package com.sept.majorproject.group09.mon.sbbackend.security;

public class LoginRequest
{

    private String username;
    private String password;

    public LoginRequest()
    {

    }


    public LoginRequest(String username, String password)
    {
        this.username  = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
