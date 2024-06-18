package com.challenge_java_angula.backend.security.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.util.List;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {

        //Paths protegidos;
        registry.addMapping("**")
                .allowedOrigins("http://vps-4183353-x.dattaweb.com:4200")
                .allowedMethods("*")
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
                .allowCredentials(true)
                .maxAge(3600);

        //Paths publicos;
        registry.addMapping("/auth/**")
                .allowedOrigins("http://vps-4183353-x.dattaweb.com:4200")
                .allowedMethods("*")
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
                .allowCredentials(false)
                .maxAge(3600);
    }

}
