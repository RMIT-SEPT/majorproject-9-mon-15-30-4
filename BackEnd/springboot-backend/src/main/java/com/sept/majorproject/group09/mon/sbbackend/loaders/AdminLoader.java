package com.sept.majorproject.group09.mon.sbbackend.loaders;

import com.sept.majorproject.group09.mon.sbbackend.model.Admin;
import com.sept.majorproject.group09.mon.sbbackend.repositories.AdminRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminLoader implements CommandLineRunner {

    @Autowired
    PasswordEncoder passwordEncoder;
    private final AdminRepository repository;
    @Autowired
    AdminLoader(AdminRepository adminRepository) {this.repository = adminRepository;};
    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new Admin("defaultAdmin", passwordEncoder.encode("password"), "admin"));
        this.repository.save(new Admin("businessOwner", passwordEncoder.encode("password"), "businessOwner"));
    }
}
