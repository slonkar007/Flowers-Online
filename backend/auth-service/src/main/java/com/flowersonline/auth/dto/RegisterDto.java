package com.flowersonline.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterDto {
    private String title;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String city;
    private String country;
}
