package com.sept.majorproject.group09.mon.sbbackend.services;

import com.sept.majorproject.group09.mon.sbbackend.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AccountDetailsService implements UserDetailsService
{

    @Autowired
    AdminService adminService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    CustomerService customerService;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Account account = null;

        account = adminService.getAdminByUsername(username);
        if(account != null)
        {
            return new User(account.getUserName(), account.getPassword(), Arrays.asList(new SimpleGrantedAuthority("ADMIN")));
        }

        account = employeeService.getEmployeeByUsername(username);
        if(account != null)
        {
            return new User(account.getUserName(), account.getPassword(), Arrays.asList(new SimpleGrantedAuthority("EMPLOYEE")));
        }

        account = customerService.getCustomerByUsername(username);
        if(account != null)
        {
            return new User(account.getUserName(), account.getPassword(), Arrays.asList(new SimpleGrantedAuthority("CUSTOMER")));
        }


        return null;
    }
}
