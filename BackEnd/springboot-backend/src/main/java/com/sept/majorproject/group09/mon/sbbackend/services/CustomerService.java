package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService
{
        @Autowired
        private CustomerRepository customerRepository;

        public Customer saveOrUpdateCustomer(Customer customerInput)
        {


            return customerRepository.save(customerInput);
        }


        public Customer getCustomerByUsername(String userName)
        {

            try
            {
                return customerRepository.customerUsername(userName).get(0);
            }
            catch(IndexOutOfBoundsException e)
            {
                return null;
            }
        }

        public List<Customer> getAllCustomers()
        {
            return customerRepository.allCustomers();
        }



}
