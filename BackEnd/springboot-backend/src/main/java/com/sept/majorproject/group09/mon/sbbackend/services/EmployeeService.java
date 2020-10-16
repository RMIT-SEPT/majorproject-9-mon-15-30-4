package com.sept.majorproject.group09.mon.sbbackend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sept.majorproject.group09.mon.sbbackend.model.Employee;

import com.sept.majorproject.group09.mon.sbbackend.repositories.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    /*
            * Connect this class to the Database
     */

    public Employee saveOrUpdateEmployee(Employee employeeInput)
    {
        //Business Logic

        return employeeRepository.save(employeeInput);
    }

    public Employee getEmployeeByUsername(String username)
    {

        try
        {
            return employeeRepository.employeeUsername(username).get(0);
        }
        catch(IndexOutOfBoundsException e)
        {
            return null;
        }
    }
    
    public List<Employee> getAllEmployees()
    {
    	return employeeRepository.getAllEmployees();
    }

}
