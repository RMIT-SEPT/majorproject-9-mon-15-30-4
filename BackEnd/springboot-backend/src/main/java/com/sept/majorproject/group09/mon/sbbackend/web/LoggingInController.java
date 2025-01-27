package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.security.LoginRequest;
import com.sept.majorproject.group09.mon.sbbackend.services.AccountDetailsService;
import com.sept.majorproject.group09.mon.sbbackend.services.AdminService;
import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;
import com.sept.majorproject.group09.mon.sbbackend.tokenization.JwtUtil;
import com.sept.majorproject.group09.mon.sbbackend.tokenization.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AccountDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    //AUTHENTICATE the INPUT, via VALIDATING if the username and password ENTERED in the backend meets the BACKEND database.
            //IF SO, RETURN "BEARER" + their JWT token (as a string).
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenicationToken(@RequestBody LoginRequest loginRequest) throws Exception
    {
        try
        {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        }
        catch (BadCredentialsException e)
        {
            throw new Exception( "Password or Username was incorrect pleas try again", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponse("Bearer " + jwt));

    }

    @Autowired
    JwtUtil jwtUtil;
    //VALIDATE CUSTOMER BASED ON TOKEN
        //IF SO, RETURN TRUE
        //OTHERWISE FALSE
    @GetMapping("/isCustomer/{token}")
    public ResponseEntity<?> isCustomer(@PathVariable("token") String jwtToken)
    {
        String username = jwtUtil.extractUsername(jwtToken);
        boolean customer = false;

        if(customerService.getCustomerByUsername(username) != null)
        {
            customer = true;
        }

        return ResponseEntity.ok(customer);
    }

    @Autowired
    EmployeeService employeeService;
    //VALIDATE TOKEN IF ACCOUNT TYPE OF EMPLOYEE
        //RETURN BOOLEAN
            //IF YES --- TRUE
            //ELSE --- FALSE
    @GetMapping("/isEmployee/{token}")
    public ResponseEntity<?> isEmployee(@PathVariable("token") String jwtToken)
    {
        String username = jwtUtil.extractUsername(jwtToken);
        boolean employee = false;

        if(employeeService.getEmployeeByUsername(username) != null)
        {
            employee = true;
        }

        return ResponseEntity.ok(employee);
    }

    @Autowired
    AdminService adminService;

    @GetMapping("/isAdmin/{token}")
    public ResponseEntity<?> isAdmin(@PathVariable("token") String jwtToken)
    {
        String username = jwtUtil.extractUsername(jwtToken);
        boolean admin = false;

        if(adminService.getAdminByUsername(username) != null)
        {
            admin = true;
        }

        return ResponseEntity.ok(admin);
    }

}
