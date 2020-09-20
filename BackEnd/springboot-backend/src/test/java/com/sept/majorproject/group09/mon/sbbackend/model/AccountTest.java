package com.sept.majorproject.group09.mon.sbbackend.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;


public class AccountTest
{
    static Account account;
    @BeforeAll
    public static void beforeAll()
    {
        account = new Admin("John", "Password", "Username");
    };

    @Test
    void checkHashedPasswordTest()
    {
        Assertions.assertTrue(account.checkHashedPassword("Password"));
    };

    @Test
    void checkHashedOPasswordTest2()
    {
        Assertions.assertFalse(account.checkHashedPassword("password"));
    };


    @Test
    void changeNameTest1()
    {
        account.setName("Bob");
        Assertions.assertEquals("Bob", account.getName());
    }

    @Test
    void changeNameTest2()
    {
        account.setName("Bob");
        Assertions.assertNotEquals("John",account.getName());
    }

}
