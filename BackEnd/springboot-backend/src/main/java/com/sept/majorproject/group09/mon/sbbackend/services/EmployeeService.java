package com.sept.majorproject.group09.mon.sbbackend.services;


import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
//import com.sept.majorproject.group09.mon.sbbackend.repository.EmployeeRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return employeeRepository.employeeUsername(username).get(0);
    }

}
