//NOTE: PLEASE READ "RESTRICTIVE TESTING" IN THE REPORT


//package com.sept.majorproject.group09.mon.sbbackend.services;
//
//import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
//import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.TestInstance;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.junit.jupiter.api.Test;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@ExtendWith(SpringExtension.class)
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class CustomerServiceIntegrationTest {
//
//
//    /*
//        * Purpose:
//        *   Create instance of CustomerService class. This exists because @Bean is used.
//        *   After this is created, this is @Autowired, as seen below.
//        *   Note: @TestConfiguratition - only tests this class
//
//     */
//    @TestConfiguration
//    static class CustomerServiceTestContextConfiguration{
//        @Bean
//        public CustomerService customerService()
//        {
//            return new CustomerService();
//        }
//    }
//
//    @Autowired
//    private CustomerService customerService;
//
//        //MockBean creates a dummy instance of CustomerRepository
//    @MockBean
//    private CustomerRepository customerRepository;
//
//    //tests
//    @BeforeAll
//    public void setUpAccount()
//    {
//
//        Customer jones = new Customer("Jones","hunter2","user_jones","jones@email.com", 987654231);
//        Mockito.when(customerRepository.findByName(jones.getUserName())).thenReturn(jones);
//    }
//
//    @Test
//    public void isTrue_ReturnsTrue_IfUserNameExists()
//    {
//
//        String userName = "user_jones";
//        Customer found = customerService.getCustomerByUserNameTest(userName);
//
//        assertTrue(found.getUserName().equals(userName));
//    }
//
//
//}
