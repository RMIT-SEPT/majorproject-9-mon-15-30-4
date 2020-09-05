package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoggingInController
{
    @Autowired
    CustomerService customerService;

    //Method assumes password is hashed
    public boolean authenticateUser(String userName, String password)
    {
        Account account = customerService.getCustomerByUsername(userName);



        return account.checkHashedPassword(password);
    }

}
