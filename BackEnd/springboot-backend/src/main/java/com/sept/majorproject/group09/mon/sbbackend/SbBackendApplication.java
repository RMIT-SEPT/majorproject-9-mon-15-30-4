package com.sept.majorproject.group09.mon.sbbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sept.majorproject.group09.mon.sbbackend.model.Customer;
import com.sept.majorproject.group09.mon.sbbackend.repositories.AccountRepository;
import com.sept.majorproject.group09.mon.sbbackend.repositories.CustomerRepository;

@SpringBootApplication
public class SbBackendApplication {

    public static void main(String[] args)
    {
        ConfigurableApplicationContext configurableApplicationContext =
                SpringApplication.run(SbBackendApplication.class, args);

//        AccountRepository customerRepository = configurableApplicationContext.getBean(CustomerRepository.class);
//        customerRepository.save(new Customer("Name", "Password", "Username", "Email", 0404));

    }

    @Bean
    public WebMvcConfigurer corsConfigurer() 
    {
        return new WebMvcConfigurer() 
        {

            @Override
            public void addCorsMappings(CorsRegistry registry) 
            {
                registry.addMapping("/api/bookings/all").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/bookings").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/bookings/available/{employeeId}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/services/all").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/services/{id}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/services/name/{name}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/working_hours/{id}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/Employee/{userName}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/login/authentication/{userName}/{password}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/login/findUserByName/{userName}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/login/checkPassword/{password}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/login/loggedIn").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/login").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/bookings/available/time/{date}/{serviceId}/{employeeId}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/services/fetch/{employeeId}/{name}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/register/findUserByName/{userName}/{password}/{name}/{contactEmail}/{contactNumber}").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/Employee/AllEmployees").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/login/authenticate").allowedOrigins("http://localhost:3000");
            }
                
        };
    }
}