
package com.sept.majorproject.group09.mon.sbbackend.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.regex.Pattern;
 ArrayList<WorkingHours> workingHours = new ArrayList<WorkingHours>();
    ArrayList<Booking> bookings = new ArrayList<Booking>();

@Entity
public class Employee extends Account{

    @Id
    private String employeeID; //For Database uses

    private int employeePhone;
    private String employeeEmail;






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
  
  
   ArrayList<WorkingHours> workingHours = new ArrayList<WorkingHours>();
    ArrayList<Booking> bookings = new ArrayList<Booking>();
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

//=======
//package com.sept.majorproject.group09.mon.sbbackend.model;
//
//import javax.persistence.Entity;
//
//@Entity
//public class Employee extends Account
//{
//
//    public Employee()
//    {
//
//    }
//
//    public Employee(String name, String password, String userName) {
//        super(name, password, userName);
//    }
//>>>>>>> origin/LoggingAuthenticiation

