package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController
{
    @Autowired
    CustomerService customerService;

    @GetMapping
    private Customer getCustomerByUserName(@PathVariable("userName") String userName)
    {
        return customerService.getCustomerByUsername(userName);
    }


}
