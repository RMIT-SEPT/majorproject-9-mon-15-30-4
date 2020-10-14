package com.sept.majorproject.group09.mon.sbbackend.tokenization;

public class LoginResponse
{
    private String jwt;

    public LoginResponse()
    {

    }

    public LoginResponse(String jwt)
    {
        this .jwt = jwt;
    }

    public String getJwt()
    {
        return jwt;
    }


}
