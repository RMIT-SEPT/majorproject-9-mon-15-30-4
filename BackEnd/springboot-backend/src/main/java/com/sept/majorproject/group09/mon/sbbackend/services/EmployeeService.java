package com.sept.majorproject.group09.mon.sbbackend.services;


import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    public Employee saveOrUpdateEmployee(Employee employeeInput)
    {


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

}