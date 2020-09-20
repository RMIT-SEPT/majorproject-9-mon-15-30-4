package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(
        value = "/api/Customer"
)
public class CustomerController
{
    @Autowired
    CustomerService customerService;

    @GetMapping
    private Customer getCustomerByUserName(@PathVariable("userName") String userName)
    {
        return customerService.getCustomerByUsername(userName);
    }

    @PostMapping("")
    public ResponseEntity<Customer> createNewCustomer(@RequestBody Customer customerInput )
    {
        Customer customer = customerService.saveOrUpdateCustomer(customerInput);

        return new ResponseEntity<Customer>(customer, HttpStatus.CREATED);
    }


}
