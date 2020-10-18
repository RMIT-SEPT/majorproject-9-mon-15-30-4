package com.sept.majorproject.group09.mon.sbbackend.loaders;

import com.sept.majorproject.group09.mon.sbbackend.model.Service;
import com.sept.majorproject.group09.mon.sbbackend.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ServiceLoader implements CommandLineRunner {

    private final ServiceRepository repository;

    @Autowired
    public ServiceLoader(ServiceRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Service("Medical", 60, "Full Medical", "Jim_User"));
        this.repository.save(new Service("Medical", 60, "Full Medical", "Frank_User"));
        this.repository.save(new Service("Medical Extended", 120, "Full Medical Extended", "Jim_User"));
        this.repository.save(new Service("Eye Test", 20, "Annual Checkup", "Jim_User"));
        this.repository.save(new Service("X-Ray", 90, "Fracture Checkup", "Frank_User"));
        this.repository.save(new Service("Physical Therapy", 30, "Mobility Training", "Frank_User"));
    }
}