package com.flowersonline.auth.service;

import com.flowersonline.auth.dto.AuthResponseDto;
import com.flowersonline.auth.dto.LoginDto;
import com.flowersonline.auth.dto.RegisterDto;
import com.flowersonline.auth.service.impl.AuthServiceImpl;
import com.flowersonline.persistence.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class AuthServiceIntegrationTest {

    @Autowired
    private AuthServiceImpl authService;

    @Autowired
    private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {
        customerRepository.deleteAll();
    }

    @Test
    void testRegisterUser_Success() {
        RegisterDto registerDto = RegisterDto.builder()
                .title("Mr")
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .phone("1234567890")
                .city("New York")
                .country("USA")
                .build();

        String result = authService.register(registerDto);

        assertEquals("User registered successfully.", result);
        assertTrue(customerRepository.existsByEmail("john.doe@example.com"));
    }

    @Test
    void testLogin_Success() {
        // Register first
        RegisterDto registerDto = RegisterDto.builder()
                .title("Mr")
                .firstName("Jane")
                .lastName("Smith")
                .email("jane.smith@example.com")
                .password("securePass")
                .phone("9876543210")
                .city("London")
                .country("UK")
                .build();
        authService.register(registerDto);

        // Try to login
        LoginDto loginDto = new LoginDto("jane.smith@example.com", "securePass");
        AuthResponseDto response = authService.login(loginDto);

        assertNotNull(response.getAccessToken());
        assertEquals("jane.smith@example.com", response.getEmail());
        assertEquals("ROLE_USER", response.getRole());
    }

    @Test
    void testLogin_Failure_WrongPassword() {
        // Register first
        RegisterDto registerDto = RegisterDto.builder()
                .title("Ms")
                .firstName("Alice")
                .lastName("Wonder")
                .email("alice@example.com")
                .password("correctPass")
                .phone("1112223333")
                .city("Paris")
                .country("France")
                .build();
        authService.register(registerDto);

        // Try login with wrong password
        LoginDto loginDto = new LoginDto("alice@example.com", "wrongPass");
        
        assertThrows(BadCredentialsException.class, () -> {
            authService.login(loginDto);
        });
    }

    @Test
    void testAdminLogin_Success() {
        // The admin user is often seeded via DataInitializer, but we can register it here too for the test
        // or rely on the fact that AuthServiceImpl handles the role based on email hardcoding for now.
        RegisterDto registerDto = RegisterDto.builder()
                .title("Mr")
                .firstName("System")
                .lastName("Admin")
                .email("admin@flowersonline.com")
                .password("admin123")
                .phone("0000000000")
                .city("Mumbai")
                .country("India")
                .build();
        authService.register(registerDto);

        LoginDto loginDto = new LoginDto("admin@flowersonline.com", "admin123");
        AuthResponseDto response = authService.login(loginDto);

        assertEquals("ROLE_ADMIN", response.getRole());
    }
}
