package com.sept.majorproject.group09.mon.sbbackend.web;


import com.sept.majorproject.group09.mon.sbbackend.model.Employee;

import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;

import java.util.List;

import com.sept.majorproject.group09.mon.sbbackend.tokenization.JwtUtil;
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

    //Initial pathway for employeeID retrieval
    @GetMapping("/{userName}")
    private Employee getEmployeeByUserName(@PathVariable("userName") String userName)
    {
        return employeeService.getEmployeeByUsername(userName);
    }


    //Initial pathway to welcome creation of new employee.
    /*
        * Assumes that EmployeeService, EmployeeRepository exists
        * Assumes that Employee is created, and takes in values via Postman/React
     */
    @PostMapping("")
    public ResponseEntity<Employee> createNewEmployee(@RequestBody Employee employeeInput )
    {
        Employee employee = employeeService.saveOrUpdateEmployee(employeeInput);

        return new ResponseEntity<Employee>(employeeInput, HttpStatus.CREATED);
    }

    /**
     * 
     * @return Returns a list of all the employees in the system
     */
    @SuppressWarnings("rawtypes")
	@GetMapping("/AllEmployees")
    private List<Employee> getAllEmployees()
    {
    	List<Employee> employ = employeeService.getAllEmployees();
    	return employ;
    }


    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/token/{jwt}")
    public ResponseEntity<?> getEmployeeFromToken(@PathVariable("jwt") String jwtToken)
    {
        String username = jwtUtil.extractUsername(jwtToken);

        Employee employee  =  employeeService.getEmployeeByUsername(username);

        return ResponseEntity.ok(employee);
    }
}
