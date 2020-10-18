package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;


import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import com.sept.majorproject.group09.mon.sbbackend.tokenization.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
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

    @GetMapping("/AllCustomers")
    public List<Customer> getAllCustomer()
    {
        return customerService.getAllCustomers();
    }


    @Autowired
    JwtUtil jwtUtil;


    @GetMapping("/token/{jwt}")
    public ResponseEntity<?> getCustomerFromToken(@PathVariable("jwt") String jwtToken)
    {
        String username = jwtUtil.extractUsername(jwtToken);

        Customer customer  =  customerService.getCustomerByUsername(username);

        return ResponseEntity.ok(customer);
    }

    /*
        * Used to get ALL customers in the existing data-base

     */
    @SuppressWarnings("rawtypes")
    @GetMapping("/AllCustomers")
    private List<Customer> getAllCustomers()
    {
        List<Customer> customer = customerService.getAllCustomers();
        return customer;
    }

}
