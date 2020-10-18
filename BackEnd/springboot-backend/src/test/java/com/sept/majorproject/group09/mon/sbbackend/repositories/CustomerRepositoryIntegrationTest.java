//* NOTE
// PLEASE READ THE SECTION 'RESTRICTIVE TESTING' in the REPORT.


//package com.sept.majorproject.group09.mon.sbbackend.repositories;
//
//import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import static org.junit.jupiter.api.Assertions.*;
//
////Note: @RunWith() is a JUnit 4. For JUnit5, we use @ExtendWith
//    //JUnit 5 extensions with JUnit5 inputs
//    //JUnit4 = @RunWith(SpringRunner.class).
//    //Junit5 = @ExtendWith(SpringExtesnion.class)
//@ExtendWith(SpringExtension.class)
////Notes: DO NOT mix @SpringBootTest with @DataJpaTest. @DataJpaTests is only for JPA components, i.e, JPARepository. We
////  used CrudRepository instead.
//@SpringBootTest
//    //Below is used in conjunction with @SpringBootTest, to ensure TestEntityManager works.
//@AutoConfigureTestEntityManager
//public class CustomerRepositoryIntegrationTest {
//
//    @Autowired
//    private TestEntityManager entityManager;
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    //Test Cases
//    @Test
//    public void isValid_True_IfCustomerDetailsAreEnteredCorrectly()
//    {
//        //Given
//            //That the account is created
//            //And the information matches the criteria
//
//
//        String name = "alex";
//        String password = "hunter2";
//        String userNameInput = "alexMax";
//        String emailInput = "alex@Email.com";
//        int contactNumberInput = 12346579;
//
//        //When
//            //The person enters the right details
//        Customer alex = new Customer(name, password, userNameInput, emailInput, contactNumberInput);
//        //Then
//            //The account should be created
//        assertTrue(alex.getName() == "alex");
//    }
//
//
//
//}