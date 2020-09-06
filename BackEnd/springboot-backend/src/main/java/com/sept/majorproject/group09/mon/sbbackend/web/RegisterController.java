package com.sept.majorproject.group09.mon.sbbackend.web;


import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;



@RestController
@RequestMapping("api/register")
public class RegisterController {

    @Autowired
    private CustomerService customerService;

    Account account = null;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/findUserByName/{userName}/{password}/{name}/{contactEmail}/{contactNumber}")
    public ResponseEntity<Customer> getUserByName
                (
                    @PathVariable("userName") String userName,
                    @PathVariable("password") String password,
                    @PathVariable("name") String name,
                    @PathVariable("contactEmail") String contactEmail,
                    @PathVariable("contactNumber") String contactPhone
                )
    {

        //SEARCH for an existing (customer) account via userName
        account = customerService.getCustomerByUsername(userName);

        //IF there is NO existing (customer) account, create one
        if(account ==null)
        {
            int number = Integer.parseInt(contactPhone);
            Customer customerInput = new Customer(name, password, userName,contactEmail,number);
            Customer newCustomer = customerService.saveOrUpdateCustomer(customerInput);
            return new ResponseEntity<Customer>(newCustomer, HttpStatus.CREATED);
        }
        else
        {
            //ELSE if there is an existing (customer) account, do not create on
            //SEND error
            return new ResponseEntity<Customer>(HttpStatus.NOT_ACCEPTABLE);
        }

    }




}
