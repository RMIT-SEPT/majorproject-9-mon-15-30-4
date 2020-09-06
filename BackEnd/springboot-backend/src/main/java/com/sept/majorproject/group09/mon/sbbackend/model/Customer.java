package com.sept.majorproject.group09.mon.sbbackend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Transient;
import javax.validation.constraints.*;

@Entity

public class Customer extends Account{

    /*
     * Optional - but allows Customer to perform actions
     */


    @NotBlank(message = "Enter around 8 to 10 digits")
    @NotNull
    @Size(min = 8, max = 10, message = "Contact Number must be between 8 to 10 digits")
    private int contactNumber;

    @NotBlank(message = "Email address must be added")
    @Size(min = 5, max = 300, message = "Must enter a contact email address")
    @NotNull
    private String contactEmail;

    /** CONSTRUCTORS
     *
     */
    public Customer()
    {

    }

    public Customer(String nameInput, String passwordInput, String userNameInput, String contactEmailAddressInput, int contactNumberInput)
    {
        super(nameInput,passwordInput,userNameInput);
        this.contactEmail = contactEmailAddressInput;
        this.contactNumber = contactNumberInput;
    }

    /**GET METHODS
     *
     * @return
     */

    public int getContactNumber()
    {
        int returnContactNumber = 0;

        if( contactNumber != 0)
        {
            returnContactNumber = this.contactNumber;
        }

        return returnContactNumber;

    }


    public String getContactEmail()
    {

        return this.contactEmail;
    }


    /**
     * MUTATOR METHODS
     */


    /**
     * setContactNumber
     * Input - Assumes that the number follows the area code; and verified
     * Output - Void - But customer's account is set to input
     * @param contactNumberInput
     */
    public void setContactNumber(int contactNumberInput)
    {
        this.contactNumber = contactNumberInput;
    }

    /**
     * setContactEmail
     * Input - Assumes that the number follows traditional email settings
     * Output - Void - But customer's account is set to input
     * @param contactEmailInput
     */
//    public void setContactEmail( String contactEmailInput)
//    {
//        this.contactEmailAddress = contactEmailInput;
//    }


}
