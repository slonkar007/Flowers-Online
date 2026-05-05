package com.flowersonline.auth.service.impl;

import com.flowersonline.auth.dto.AuthResponseDto;
import com.flowersonline.auth.dto.LoginDto;
import com.flowersonline.auth.dto.RegisterDto;
import com.flowersonline.auth.security.JwtTokenProvider;
import com.flowersonline.auth.service.AuthService;
import com.flowersonline.model.entity.Customer;
import com.flowersonline.persistence.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {

        // Check if email already exists
        if (customerRepository.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        Customer customer = new Customer();
        customer.setTitle(registerDto.getTitle());
        customer.setFirstName(registerDto.getFirstName());
        customer.setLastName(registerDto.getLastName());
        customer.setEmail(registerDto.getEmail());
        customer.setPhone(registerDto.getPhone());
        customer.setCity(registerDto.getCity());
        customer.setCountry(registerDto.getCountry());
        
        customer.setPasswordHash(passwordEncoder.encode(registerDto.getPassword()));

        customerRepository.save(customer);

        return "User registered successfully.";
    }

    @Override
    public AuthResponseDto login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        String role = "ROLE_USER";
        if ("admin@flowersonline.com".equalsIgnoreCase(loginDto.getEmail())) {
            role = "ROLE_ADMIN";
        }

        AuthResponseDto response = new AuthResponseDto();
        response.setAccessToken(token);
        response.setEmail(loginDto.getEmail());
        response.setRole(role);
        
        return response;
    }
}
