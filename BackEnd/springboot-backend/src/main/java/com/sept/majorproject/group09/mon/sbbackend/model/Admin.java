package com.sept.majorproject.group09.mon.sbbackend.model;



import javax.persistence.Entity;

@Entity
public class Admin extends Account{

   

    public Admin()
    {

    }

    public Admin(String nameInput, String passwordInput, String userNameInput)
    {
        super(nameInput,passwordInput,userNameInput);
    }

    /**
     * Assumptions
     * - There is one employee that is being created, (i.e here). Does not interact with the frontend at all
     * --^ Is subject is change
     *
     * --Double Check - Tutorial Example was applied and extracted into employeeController-Service-RepositoryLink
     */
//    public void createEmployee()
//    {
//        //Create Employee
//
//        Employee newEmployee = new Employee("testName", "hunter2", "employeeZ",911,"testEmail@hotmail.com");
//        //Add Employee to existing list of employee accounts
//        //Added to the repository
//    }






}
