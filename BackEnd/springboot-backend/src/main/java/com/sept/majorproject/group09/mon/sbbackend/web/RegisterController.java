package com.sept.majorproject.group09.mon.sbbackend.web;


import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;





/*
    * PURPOSE:
    *       SEND certain inputs from FRONT-END (via react) into the BACKEND
    *       BACKEND, via RegisterController will inspect CustomerService, THEN Customer itself

 */

@RestController
@RequestMapping("api/register")
@CrossOrigin
public class RegisterController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmployeeService employeeService;

    Account account = null;

    /*  LOGIC::
        * IF there is NO existing customer account by the SAME username,
        *       CREATE a new customer account, and add it into the repository
        * ELSE
        *       REJECT the input
     */
    @GetMapping("/findUserByName/{userName}/{password}/{name}/{contactEmail}/{contactNumber}")
    public ResponseEntity<Customer> getUserByName
                (
                    @PathVariable("userName") String userName,
                    @PathVariable("password") String password,
                    @PathVariable("name") String name,
                    @PathVariable("contactEmail") String contactEmail,
                    @PathVariable("contactNumber") int contactPhone
                )
    {

        //1. SEARCH for an existing (customer) account via userName
        account = customerService.getCustomerByUsername(userName);

        //2. IF there is NO existing (customer) account, create one
        if(account == null)
        {

            Customer customerInput = new Customer(name, passwordEncoder.encode(password), userName,contactEmail,contactPhone);
            Customer newCustomer = customerService.saveOrUpdateCustomer(customerInput);
            return new ResponseEntity<Customer>(newCustomer, HttpStatus.CREATED);
        }
        else
        {
            //ELSE send ERROR
            return new ResponseEntity<Customer>(HttpStatus.NOT_ACCEPTABLE);
        }

    }

    /* LOGIC::
        * IF there is NO existing employee account by the SAME username,
        *       CREATE a new EMPLOYEE account, and add it into the repository
        * ELSE
        *       REJECT the input

     */
    @GetMapping("/findEmployeeByUsername/{userName}/{password}/{name}/{employeeEmail}/{employeePhone}")
    public ResponseEntity<Employee> getEmployeeByUserName
            (
                    @PathVariable("userName") String userName,
                    @PathVariable("password") String password,
                    @PathVariable("name") String name,
                    @PathVariable("employeePhone") int employeePhone,
                    @PathVariable("employeeEmail") String employeeEmail
            ) {
        //1. SEARCH for an existing (employee) account via userName
        account = employeeService.getEmployeeByUsername(userName);

        //2. CREATE (employee) account if account it does not exist
        if (account == null) {
            //Create new Employee
            Employee employeeInput = new Employee(name, passwordEncoder.encode(password), userName, employeePhone, employeeEmail);
            //Add new Employee into repository
            Employee newEmployee = employeeService.saveOrUpdateEmployee(employeeInput);
            //Return response to front-end
            return new ResponseEntity<Employee>(newEmployee, HttpStatus.CREATED);
        } else {
            //OTHERWISE send ERROR
            return new ResponseEntity<Employee>(HttpStatus.NOT_ACCEPTABLE);

        }
    }






}
