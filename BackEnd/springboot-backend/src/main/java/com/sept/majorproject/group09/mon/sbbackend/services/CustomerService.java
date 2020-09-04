package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
//import com.sept.majorproject.group09.mon.sbbackend.repository.CustomerRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class CustomerService {
        @Autowired
        private CustomerRepository customerRepository;

        public Customer saveOrUpdateCustomer(Customer customerInput)
        {
            //business logic

            return customerRepository.save(customerInput);
        }


        public Customer getCustomerByUsername(String userName)
        {
            return customerRepository.customerUsername(userName).get(0);
        }




}
