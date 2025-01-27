
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

        this.employeeEmail = employeeEmailInput;

        if(AcceptableContactNumberLength(employeePhoneInput) == true)
        {
            this.employeePhone = employeePhoneInput;
        }
        else
        {
            this.employeePhone = 99999999;
        }
    }

    //VALIDATORS
    private boolean AcceptableContactNumberLength(int employee_phone_input)
    {
        boolean result = false;

        if(Integer.toString(employee_phone_input).length() >= 8 ||Integer.toString(employee_phone_input).length() <= 10 )
        {
            result = true;
        }
        return result;
    }



    //GETTERS

    public int getEmployeePhone() {

        return this.employeePhone;
    }

    public String getEmployeeEmail()
    {

        return this.employeeEmail;
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


