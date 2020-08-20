package com.sept.majorproject.group09.mon.sbbackend.model;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity

public class Customer extends Account{

    @Id //This makes customerID the PK in the H2 Database
    private String customerID;


    /*
     * Optional - but allows Customer to perform actions
     */
    private int contactNumber;
    private String contactHomeAddress;
    private String contactEmail;

    /** CONSTRUCTORS
     *
     */
    public Customer()
    {

    }
    public Customer(String nameInput, String passwordInput, String userNameInput, String contactHomeAddressInput, int contactNumberInput)
    {
        super(nameInput,passwordInput,userNameInput);
        this.contactNumber = contactNumberInput;
        this.contactHomeAddress = contactHomeAddressInput;
    }

    public Customer(String nameInput, String passwordInput, String userNameInput, String contactEmailInput )
    {
        super(nameInput,passwordInput,userNameInput);
        this.contactEmail = contactEmailInput;
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
        String returnEmail = "";

        if(contactEmail != null || contactEmail.equals(""))
        {
            returnEmail = this.contactEmail;
        }

        return returnEmail;
    }

    public String getContactHomeAddress()
    {
        return this.contactHomeAddress;


    }

    /**
     * MUTATOR METHODS
     */

    /**
     * setContactHomeAddress
     * Input - Assumes that the input is legitimate
     * Output - Void - Sets the customer's home address to the following
     * @param addressInput
     *
     */
    public void setContactHomeAddress(String addressInput)
    {
        this.contactHomeAddress = addressInput;
    }

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
    public void setContactEmail( String contactEmailInput)
    {
        this.contactEmail = contactEmailInput;
    }


}
