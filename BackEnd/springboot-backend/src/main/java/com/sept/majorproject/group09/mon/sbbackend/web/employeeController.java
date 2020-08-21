package com.sept.majorproject.group09.mon.sbbackend.web;

import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
//import com.sept.majorproject.group09.mon.sbbackend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


//@RestController
//@RequestMapping("/api/Employee")
//public class employeeController {
//
//    @Autowired
//    private EmployeeService employeeService;
//
//    @PostMapping("")
//    public ResponseEntity<Employee> createNewEmployee(@RequestBody Employee employeeInput )
//    {
//        Employee employee = employeeService.saveOrUpdateEmployee(employeeInput);
//
//        return new ResponseEntity<Employee>(employeeInput, HttpStatus.CREATED);
//    }
//
//
//}
