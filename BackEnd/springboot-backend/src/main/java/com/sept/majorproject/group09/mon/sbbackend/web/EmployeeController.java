package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
//import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;
import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping(
        value = "/api/Employee"
        )
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    /*  LOGIC::
            * ENTER front-end variable, 'userName' via Axios
            * GET front-end variable 'userName', if it matches, AND it exists in employeeService
     */
    @GetMapping
    private Employee getEmployeeByUserName(@PathVariable("userName") String userName)
    {
        return employeeService.getEmployeeByUsername(userName);
    }




    /* LOGIC::
        * ENTER new unit of Employee via Front-EnD
        * SEND Employee into employeeServices' repository.
     */
    @PostMapping("")
    public ResponseEntity<Employee> createNewEmployee(@RequestBody Employee employeeInput )
    {
        Employee employee = employeeService.saveOrUpdateEmployee(employeeInput);

        return new ResponseEntity<Employee>(employeeInput, HttpStatus.CREATED);
    }


}
