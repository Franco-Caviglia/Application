package com.challenge_java_angula.backend.app.entity.dto;


import com.challenge_java_angula.backend.app.entity.Admin;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantRequest {


    private String plantName;

    private String readings;

    private String avgAlerts;

    private String country;

    private String disabledSensors;

    private String redAlerts;

}
