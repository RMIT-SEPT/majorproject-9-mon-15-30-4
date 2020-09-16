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

//        if(Integer.toString(contactNumberInput).length() >=  8  || Integer.toString(contactNumberInput).length()  <= 10 )
//        {
//            this.contactNumber = contactNumberInput;
//        }


//        if(contactEmailAddressInput.length() >= 5  || contactEmailAddressInput.length() <= 300)
//        {
//            this.contactEmail = contactEmailAddressInput;
//        }

        if(AcceptableContactNumberLength(contactNumberInput) == true)
        {
            this.contactNumber = contactNumberInput;
        }
        else
        {
            this.contactNumber = 000000000;
        }

        if(AcceptableEmailCharacterLength(contactEmailAddressInput) == true)
        {
            this.contactEmail = contactEmailAddressInput;
        }
        else {
            this.contactEmail = "INVALID EMAIL";
        }

    }

    private boolean AcceptableContactNumberLength(int contact_number_input)
    {
        boolean result = false;

        if(Integer.toString(contact_number_input).length() >=8 || Integer.toString(contact_number_input).length() <= 10)
        {
            result = true;
        }

        return result;
    }

    private boolean AcceptableEmailCharacterLength(String contact_email_input)
    {
        boolean result = false;

        if(contact_email_input.length() >= 10 || contact_email_input.length() <= 300)
        {
            result = true;
        }

        return result;
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
