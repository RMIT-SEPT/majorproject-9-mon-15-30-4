package com.sept.majorproject.group09.mon.sbbackend.web;


import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.services.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;


import java.util.Arrays;
import java.util.List;


import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath; //Import for the  mvc.perform(get().xxxx stuff)
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@ExtendWith(SpringExtension.class) //Required for JUnit 5 Testing, & NON-JPA Repository (aka we're using CRUD repository)
@WebMvcTest(CustomerController.class)

public class CustomerControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CustomerService customerService;

    //Test Cases
        /*
            * Used to test if 'getAllCustomers()' from CustomerController works.
            * Note:
                - Controller depends on an existence of CustomerService (hence MockBean)
                -

         */
    @Test
    public void ExpectsCustomerExist_ReturnsCustomerList_IfCorrectDetails() throws Exception
    {
        //Given
            //That there is a list that contains Jones
        Customer jones = new Customer("Jones","hunter2","user_jones","jones@email.com", 987654231);
        List<Customer> allCustomers = Arrays.asList(jones);
            //AND we call getAllCustomers() from customerService
        given(customerService.getAllCustomers()).willReturn(allCustomers);
        //WHEN & THEN
        mvc.perform(
                get("/api/Customer/Customers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",hasSize(1)))
                .andExpect((ResultMatcher) jsonPath("$[0].name").value(jones.getName())
                );
    }

}
