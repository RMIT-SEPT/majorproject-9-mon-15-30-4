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
        this.repository.save(new Employee("Jim", "1234", "1", 8, "Jim@mail.com"));
        this.repository.save(new Employee("Frank", "1234", "2", 8,"Frank@mail.com"));
        this.repository.save(new Employee("Bill", "1234", "Bilbo", 8,"Bilbo@mail.com"));
    }
}