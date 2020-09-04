
package com.sept.majorproject.group09.mon.sbbackend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.lang.reflect.Array;
import java.util.regex.Pattern;


@Entity
public class Employee<WorkingHours> extends Account{

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)


    @NotNull
    @Size(min = 8, max = 10, message = "Must enter in a number between 8 to 10 digits")
    private int employeePhone;


    @NotNull
    private String employeeEmail;
    //Same issues as  CustomerEmail in Customer>Customer


    @Transient
    ArrayList<WorkingHours> workingHours = new ArrayList<WorkingHours>();

    @Transient
    ArrayList<Booking> bookings = new ArrayList<Booking>();


    // --- CONSTRUCTORS
    public Employee()
    {

    }

    // ----! IF ALL DETAILS ENTERED
    public Employee(String nameInput, String passwordInput, String userNameInput, int employeePhoneInput, String employeeEmailInput)
    {
        super(nameInput, passwordInput, userNameInput);
        this.employeePhone = employeePhoneInput;
        this.employeeEmail = employeeEmailInput;
    }

    /// ----! IF ONLY PHONE ENTERED
    public Employee(String nameInput, String passwordInput, String userNameInput, int employeePhoneInput)
    {
        super(nameInput, passwordInput, userNameInput);
        this.employeePhone = employeePhoneInput;
    }

    /// ----! IF ONLY EMAIL ENTERED
    public Employee(String nameInput, String passwordInput, String userNameInput, String employeeEmailInput)
    {
        super(nameInput, passwordInput, userNameInput);
        this.employeeEmail = employeeEmailInput;
    }
    //GETTERS

    public int getEmployeePhone() {

        int returnPhone = 0;

        if(employeePhone != 0)
        {
            returnPhone = this.employeePhone;
        }
        return returnPhone;
    }

    public String getEmployeeEmail()
    {
        String returnEmail = "";
        if(employeeEmail != "" || employeeEmail != null)
        {
            returnEmail = this.employeeEmail;
        }

        return employeeEmail;
    }


    //SETTERS

    /**
     * setEmployeePhone
     * Input - Assumes that the phoneInput follows national number system
     * Output - Void - Sets phonenumber for the following account
     * @param phoneInput
     */
    public void setEmployeePhone(int phoneInput)
    {
        this.employeePhone = phoneInput;
    }

    /**
     * setEmployeeEmail
     * Input - Assumes that the input follows traditional email format
     * Output - Void - sets email for the following account
     * @param emailInput
     */
    public void setEmployeeEmail(String emailInput)
    {
        this.employeeEmail = emailInput;
    }
  
  

    ArrayList getWorkingHours() {
        return workingHours;
    }

    ArrayList getBookings() {
        return bookings;
    }

    boolean addBooking(Booking bookingToAdd) {
        return bookings.add(bookingToAdd);
    }

}


