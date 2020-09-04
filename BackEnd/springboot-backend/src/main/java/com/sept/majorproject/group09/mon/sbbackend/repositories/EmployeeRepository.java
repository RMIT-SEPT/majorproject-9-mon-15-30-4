package com.sept.majorproject.group09.mon.sbbackend.repositories;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.model.WorkingHours;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends AccountRepository{


    /*
        * This should be finding Employee's ID instead - AccountRepository might need to change.
     */
    Iterable<Account> findAllById(Iterable<String> iterable);

    @Query(value = "SELECT * FROM Working_Hours WHERE employee_id = :employeeId ORDER BY date ASC", nativeQuery = true)
    List<Employee> findAllByEmployee(@Param("employeeId") String employeeId);

    //Query to retrieve data from Employee username
    @Query(value = "SELECT * From EMPLOYEE WHERE userName = :userName", nativeQuery = true)
    List<Employee> employeeUsername(@Param("userName") String userName);


}
