package com.flowersonline.auth.service;

import com.flowersonline.auth.dto.AuthResponseDto;
import com.flowersonline.auth.dto.LoginDto;
import com.flowersonline.auth.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    AuthResponseDto login(LoginDto loginDto);
}
