package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoggingInController
{
    @Autowired
    CustomerService customerService;


    Account loggedInAccount = null;

    //Method assumes password is hashed
    @GetMapping("/authentication/{userName}/{password}")
    public ResponseEntity<HttpStatus> authenticateUser(@PathVariable("username") String userName, @PathVariable("password") String password)
    {
        loggedInAccount = customerService.getCustomerByUsername(userName);
        
        if(loggedInAccount == null)
        {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(loggedInAccount.checkHashedPassword(password)) 
        {
        	return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        else
        {
        	loggedInAccount = null;
        	return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
    Account account = null;
    @GetMapping("/findUserByName/{userName}")
    public ResponseEntity<HttpStatus> getUserByName(@PathVariable("userName") String userName)
    {
    	account = customerService.getCustomerByUsername(userName);
    	if(account == null)
    	{
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	else
    	{
    		return new ResponseEntity<>(HttpStatus.ACCEPTED);
    	}
    }
    
    @GetMapping("/checkPassword/{password}")
    public ResponseEntity<HttpStatus> checkPassword(@PathVariable("password") String password)
    {
    	if(account.checkHashedPassword(password))
    	{
    		return new ResponseEntity<>(HttpStatus.ACCEPTED);
    	}
    	else
    	{
    		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    	}
    }
    
    @GetMapping("/loggedIn")
    public ResponseEntity<HttpStatus> isLoggedIn()
    {
    	if(loggedInAccount != null)
    	{
    		return new ResponseEntity<>(HttpStatus.ACCEPTED);
    	}
    	else
    	{
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	
    }

}
