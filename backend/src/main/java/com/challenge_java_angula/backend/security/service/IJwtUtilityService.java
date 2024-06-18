package com.challenge_java_angula.backend.security.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;

public interface IJwtUtilityService {

    String generateJwt(String name) throws JOSEException, IOException, NoSuchAlgorithmException, InvalidKeySpecException;

    JWTClaimsSet parseJwt(String token) throws ParseException, JOSEException, IOException, NoSuchAlgorithmException, InvalidKeySpecException;
}
