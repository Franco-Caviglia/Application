package com.challenge_java_angula.backend.app.controller;


import com.challenge_java_angula.backend.app.entity.dto.PlantRequest;
import com.challenge_java_angula.backend.app.entity.dto.PlantResponse;
import com.challenge_java_angula.backend.app.service.AppServiceImpl;
import com.challenge_java_angula.backend.security.service.impl.JwtUtilityServiceImpl;
import com.challenge_java_angula.backend.validation.ValidationResponse;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/app/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://vps-4183353-x.dattaweb.com:4200")
public class AppController {

    private final AppServiceImpl appService;
    private final JwtUtilityServiceImpl jwtUtilityService;

    @PostMapping("/addPlant")
    private ResponseEntity<ValidationResponse> addPlant(@RequestHeader("Authorization") String token, @RequestBody PlantRequest plantRequest) throws ParseException, IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException {
        return new ResponseEntity<>(appService.addPlant(getAdminFromToken(token), plantRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{plant_id}/editPlant")
    private ResponseEntity<ValidationResponse> editPlant(@RequestHeader("Authorization") String token, @PathVariable Long plant_id , @RequestBody PlantResponse plantResponse) throws ParseException, IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException {
        return new ResponseEntity<>(appService.editPlant(getAdminFromToken(token), plant_id, plantResponse), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{plant_id}/delPlant")
    private ResponseEntity<ValidationResponse> delPlant(@RequestHeader("Authorization") String token, @PathVariable Long plant_id) throws ParseException, IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException {
        return new ResponseEntity<>(appService.delPlant(getAdminFromToken(token), plant_id), HttpStatus.OK);
    }

    @GetMapping("/plants")
    private ResponseEntity<List<PlantResponse>> getPlants(@RequestHeader("Authorization") String token) throws ParseException, IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException {
        return new ResponseEntity<>(appService.getPlants(getAdminFromToken(token)), HttpStatus.OK);
    }

    @GetMapping("/{plant_id}/infoPlant")
    private ResponseEntity<PlantResponse> infoPlant(@RequestHeader("Authorization") String token, @PathVariable Long plant_id) throws ParseException, IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException {
        return new ResponseEntity<>(appService.getInfoPlant(getAdminFromToken(token), plant_id), HttpStatus.OK);
    }


    private String getAdminFromToken(String token) throws ParseException, IOException, NoSuchAlgorithmException, InvalidKeySpecException, JOSEException {
        JWTClaimsSet claimsSet = jwtUtilityService.parseJwt(token.replace("Bearer ", ""));
        return claimsSet.getSubject();
    }

}
