package com.sept.majorproject.group09.mon.sbbackend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoggingInController
{
    @Autowired
    CustomerService customerService;



    Account loggedInAccount = null;


    /**Method assumes password is hashed returns the account if logged in
     * @deprecated Methods subject to chain when spring security is implemented
     * @param userName
     * @param password
     * @return returns the account if log in is successful
     */
    @GetMapping("/authentication/{userName}/{password}")
    public ResponseEntity<Account> authenticateUser(@PathVariable("userName") String userName, @PathVariable("password") String password)
    {
        loggedInAccount = customerService.getCustomerByUsername(userName);
        
        if(loggedInAccount == null)
        {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(loggedInAccount.checkHashedPassword(password)) 
        {
        	return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
        }
        else
        {
        	loggedInAccount = null;
        	return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
    
    Account account = null;
    @GetMapping("/findUserByName/{userName}")
    
    /**
     * @deprecated Methods subject to chain when spring security is implemented
     * @param userName
     * @return returns the account by the username
     */
    public ResponseEntity<Account> getUserByName(@PathVariable("userName") String userName)
    {
    	account = customerService.getCustomerByUsername(userName);
    	if(account == null)
    	{
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	else
    	{
    		return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
    	}
    }
    
    /**
     * @deprecated Methods subject to chain when spring security is implemented
     * @param password
     * @return returns an account is password is matches
     */
    @GetMapping("/checkPassword/{password}")
    public ResponseEntity<Account> checkPassword(@PathVariable("password") String password)
    {
    	if(account.checkHashedPassword(password))
    	{
    		return new ResponseEntity<>(loggedInAccount, HttpStatus.OK);
    	}
    	else
    	{
    		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    	}
    }
    
    /**
     * @deprecated Methods subject to chain when spring security is implemented
     * @return returns a boolean if the nuser is logged in
     */
    @GetMapping("/loggedIn")
    public ResponseEntity<Boolean> isLoggedIn()
    {
    	if(loggedInAccount != null)
    	{
    		return new ResponseEntity<>(true, HttpStatus.OK);
    	}
    	else
    	{
    		return new ResponseEntity<>(false, HttpStatus.OK);
    	}
    	
    }

}
