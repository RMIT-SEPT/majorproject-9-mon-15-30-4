package com.sept.majorproject.group09.mon.sbbackend.loaders;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomerLoader implements CommandLineRunner
{
    @Autowired
    PasswordEncoder passwordEncoder;
    private final CustomerRepository repository;
    @Autowired
    CustomerLoader(CustomerRepository customerRepository){ this.repository = customerRepository;}
    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new Customer("John", passwordEncoder.encode("password"), "John_Customer", "john@gmail.com", 0404123456));
        this.repository.save(new Customer("Fred", passwordEncoder.encode("password"), "Fred_Customer", "fred@gmail.com", 0404113456));
        this.repository.save(new Customer("George", passwordEncoder.encode("password"), "George_Customer", "george@gmail.com", 0404115456));
        this.repository.save(new Customer("Harry", passwordEncoder.encode("password"), "Harry_Customer", "harry@gmail.com", 0404113256));
        this.repository.save(new Customer("Ron", passwordEncoder.encode("password"), "Ron_Customer", "ron@gmail.com", 0402113456));
    }
}
