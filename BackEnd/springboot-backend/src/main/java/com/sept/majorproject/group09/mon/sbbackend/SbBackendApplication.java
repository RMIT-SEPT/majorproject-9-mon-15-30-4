package com.sept.majorproject.group09.mon.sbbackend;

//import com.sept.majorproject.group09.mon.sbbackend.repository.CustomerRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.repositories.AccountRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;

@SpringBootApplication
public class SbBackendApplication {

    public static void main(String[] args)
    {
        ConfigurableApplicationContext configurableApplicationContext =
                SpringApplication.run(SbBackendApplication.class, args);

        AccountRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
        
        customerRepository.save(new Customer("Name", "Password", "Username", "Email", 0404));
    }

}
