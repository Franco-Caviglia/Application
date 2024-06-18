package com.challenge_java_angula.backend.security.config;

import com.challenge_java_angula.backend.validation.AdminValidation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigValidation {

    @Bean
    public AdminValidation adminValidation(){ return new AdminValidation(); };
}
