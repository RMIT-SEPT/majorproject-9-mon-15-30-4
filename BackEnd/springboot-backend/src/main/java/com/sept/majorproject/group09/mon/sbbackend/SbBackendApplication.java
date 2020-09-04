package com.sept.majorproject.group09.mon.sbbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SbBackendApplication {

    public static void main(String[] args)
    {
        ConfigurableApplicationContext configurableApplicationContext =
                SpringApplication.run(SbBackendApplication.class, args);

    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/bookings/all").allowedOrigins("http://localhost:3000");
                registry.addMapping("/api/services/all").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
