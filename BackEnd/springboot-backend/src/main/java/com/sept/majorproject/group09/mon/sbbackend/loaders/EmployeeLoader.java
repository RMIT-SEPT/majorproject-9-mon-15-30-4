package com.sept.majorproject.group09.mon.sbbackend.loaders;

import com.sept.majorproject.group09.mon.sbbackend.model.Employee;
import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import com.sept.majorproject.group09.mon.sbbackend.repositories.EmployeeRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EmployeeLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public EmployeeLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Employee("Jim", "pass1234","Jim_User", 444555666, "Jim@mail.com"));
        this.repository.save(new Employee("Frank", "pass1234","Frank_User", 98765432, "Frank@mail.com"));
        this.repository.save(new Employee("Bill","pass1234","Bill_User",12345679,"Bill@Mail.com"));
    }
}