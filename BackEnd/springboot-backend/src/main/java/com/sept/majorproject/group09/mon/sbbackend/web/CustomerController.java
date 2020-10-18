package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
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

    //GET the customer by username when needed in the front-end
    @GetMapping
    private Customer getCustomerByUserName(@PathVariable("userName") String userName)
    {
        return customerService.getCustomerByUsername(userName);
    }

    //CREATE a new customer when the user presses 'submit' in the front-end.
    @PostMapping("")
    public ResponseEntity<Customer> createNewCustomer(@RequestBody Customer customerInput )
    {
        Customer customer = customerService.saveOrUpdateCustomer(customerInput);

        return new ResponseEntity<Customer>(customer, HttpStatus.CREATED);
    }


    @Autowired
    JwtUtil jwtUtil;

    //RETRIEVE CUSTOMER INFORMATION FROM the GIVEN TOKEN
        //IS CALLED SPECIFICALLY FROM THE FRONT-END
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
