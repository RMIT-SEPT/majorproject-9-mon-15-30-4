package com.sept.majorproject.group09.mon.sbbackend.model;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Admin extends Account{

    @Id
    private String adminID;

    public Admin()
    {

    }

    public Admin(String nameInput, String passwordInput, String userNameInput)
    {
        super(nameInput,passwordInput,userNameInput);
    }

    /**
     * Assumptions - There will be additional employees being created
     */
    public void createEmployee()
    {
        //Create Employee

        Employee newEmployee = new Employee("testName", "hunter2", "employeeZ",911,"testEmail@hotmail.com");
        //Add Employee to existing list of employee accounts
    }




}
