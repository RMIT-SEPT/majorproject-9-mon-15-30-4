package com.sept.majorproject.group09.mon.sbbackend.model;

import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;


public class RegisterTest {

    //TEST creation of EXISTING (customer) account

    static Customer mock_existing_customer_account;
    static Employee mock_existing_employee_account;


    @Test
    void TestLegitimateCreationOnDifferentCustomerAccountUserName()
    {
        String mock_new_user_name = "aaa";
        String mock_name_input = "David";
        String mock_password_input = "hunter2";
        String mock_email_address_input = "david.hunter@hotmail.com";
        int mock_contact_number_input = 123456789;

        assertNotNull(new Customer(mock_name_input,mock_password_input,mock_new_user_name,mock_email_address_input,mock_contact_number_input), "Account Created");
    }

    @Test
    void NotTheSameContactNumberWhenEnteredInappropriateLength()
    {
        int mock_contact_number = 1234567;
        String mock_new_user_name = "aaa";
        String mock_name_input = "David";
        String mock_password_input = "hunter2";
        String mock_email_address_input = "david.hunter@hotmail.com";

        Customer test_customer = new Customer(mock_name_input,mock_password_input,mock_new_user_name,mock_email_address_input,mock_contact_number);
        assertNotSame(test_customer.getContactNumber(),mock_contact_number);
    }

    @Test
    void CustomerSameContactNumberWhenAppropriateLength()
    {
        int mock_contact_number = 123456789;
        String mock_new_user_name = "aaa";
        String mock_name_input = "David";
        String mock_password_input = "hunter2";
        String mock_email_address_input = "david.hunter@hotmail.com";

        Customer test_customer = new Customer(mock_name_input,mock_password_input,mock_new_user_name,mock_email_address_input,mock_contact_number);

        assertEquals(test_customer.getContactNumber(),mock_contact_number);
    }

    @Test
    void CustomerSameEmailAddressWhenEnteredInappropriateLength()
    {
        int mock_contact_number = 123456789;
        String mock_new_user_name = "aaa";
        String mock_name_input = "David";
        String mock_password_input = "hunter2";
        String mock_email_address_input ="david.email";

        Customer test_customer = new Customer(mock_name_input,mock_password_input,mock_new_user_name,mock_email_address_input,mock_contact_number);
        assertSame(test_customer.getContactEmail(),mock_email_address_input);
    }

    @Test
    void ValidContactNumber_isEqual_IfContactNumberWithinLength()
    {
        int mock_emp_num = 987654321;
        String mock_user_name = "abc";
        String mock_name = "abc";
        String mock_password = "pass";
        String mock_email = "email";

        Employee test_employee = new Employee(mock_name, mock_password,mock_user_name,mock_emp_num,mock_email);
        assertEquals(test_employee.getEmployeePhone(),mock_emp_num);
    }

    @Test
    void InvalidContactNumber_isNoEqual_IfContactNumberOutsideLength()
    {
        int mock_emp_num = 98760;
        String mock_user_name = "abc";
        String mock_name = "abc";
        String mock_password = "pass";
        String mock_email = "email";

        Employee test_employee = new Employee(mock_name, mock_password,mock_user_name,mock_emp_num,mock_email);
        System.out.println("The given number is: " + test_employee.getEmployeePhone());
        System.out.println("Length of mock_emp_num = " + Integer.toString(mock_emp_num).length());
        assertNotSame(test_employee.getEmployeePhone(),99999999);
    }





}
