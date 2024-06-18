package com.challenge_java_angula.backend.security.service;

import com.challenge_java_angula.backend.security.dto.request.LoginRequest;
import com.challenge_java_angula.backend.security.dto.request.RegisterRequest;
import com.challenge_java_angula.backend.security.dto.response.TokenResponse;
import com.challenge_java_angula.backend.validation.ValidationResponse;

public interface IAuthService {

    TokenResponse login(LoginRequest loginRequest) throws Exception;

    ValidationResponse register(RegisterRequest registerRequest) throws Exception;
}
