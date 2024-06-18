package com.challenge_java_angula.backend.security.controller;


import com.challenge_java_angula.backend.security.dto.request.LoginRequest;
import com.challenge_java_angula.backend.security.dto.request.RegisterRequest;
import com.challenge_java_angula.backend.security.dto.response.TokenResponse;
import com.challenge_java_angula.backend.security.service.IAuthService;
import com.challenge_java_angula.backend.validation.ValidationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {


    private final IAuthService authService;


    @PostMapping("/register")
    private ResponseEntity<ValidationResponse> register(@RequestBody RegisterRequest registerRequest) throws Exception {
        return new ResponseEntity<>(authService.register(registerRequest), HttpStatus.CREATED);
    }


    @PostMapping("/login")
    private ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
        return new ResponseEntity<>(authService.login(loginRequest), HttpStatus.OK);
    }
}
