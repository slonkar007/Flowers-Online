package com.flowersonline.auth.bootstrap;

import com.flowersonline.model.entity.Customer;
import com.flowersonline.persistence.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!customerRepository.existsByEmail("admin@flowersonline.com")) {
            Customer admin = new Customer();
            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setTitle("Mr");
            admin.setEmail("admin@flowersonline.com");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setPhone("0000000000");
            admin.setCity("Pune");
            admin.setCountry("India");
            
            customerRepository.save(admin);
            System.out.println("Admin user seeded: admin@flowersonline.com / admin123");
        }
    }
}
