package com.challenge_java_angula.backend.security.service.impl;

import com.challenge_java_angula.backend.app.entity.Admin;
import com.challenge_java_angula.backend.app.entity.enums.Role;
import com.challenge_java_angula.backend.app.repository.AdminRepository;
import com.challenge_java_angula.backend.security.dto.request.LoginRequest;
import com.challenge_java_angula.backend.security.dto.request.RegisterRequest;
import com.challenge_java_angula.backend.security.dto.response.TokenResponse;
import com.challenge_java_angula.backend.security.service.IAuthService;
import com.challenge_java_angula.backend.validation.AdminValidation;
import com.challenge_java_angula.backend.validation.ValidationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final AdminRepository adminRepository;
    private final JwtUtilityServiceImpl jwtUtilityService;
    private final AdminValidation adminValidation;

    @Override
    public TokenResponse login(LoginRequest loginRequest) throws Exception {

        TokenResponse tokenResponse = new TokenResponse();

        try {
            Admin admin = adminRepository.findByEmail(loginRequest.getEmail());

            if(admin != null){
                if(verifyPassword(loginRequest.getPassword(), admin.getPassword())){
                    tokenResponse.setUsername(admin.getName());
                    tokenResponse.setToken(jwtUtilityService.generateJwt(admin.getEmail()));
                    tokenResponse.setAuthority(admin.getAuthorities().toString());
                    tokenResponse.setSuccess(true);
                } else {
                    tokenResponse.setSuccess(false);
                    tokenResponse.setToken("Usuario y/o contraseña incorrectos!");
                }
            } else {
                tokenResponse.setSuccess(false);
                tokenResponse.setToken("Usuario no existente!");
            }
            return tokenResponse;
        } catch (Exception e){
            throw new Exception(e.toString());
        }
    }

    @Override
    public ValidationResponse register(RegisterRequest registerRequest) throws Exception {

        Admin admin = Admin.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .name(registerRequest.getName())
                .role(Role.Admin)
                .build();

        try{
            ValidationResponse validationResponse = adminValidation.validate(admin);

            if(validationResponse.getNumOfErrors() > 0){
                return validationResponse;
            }

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            admin.setPassword(encoder.encode(admin.getPassword()));

            adminRepository.save(admin);
            validationResponse.setMessage("Registrado correctamente!");

            return validationResponse;
        } catch (Exception e){
            throw new Exception(e.toString());
        }
    }


    private boolean verifyPassword(String enteredPass, String storagePass){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        return encoder.matches(enteredPass, storagePass);
    }
}
