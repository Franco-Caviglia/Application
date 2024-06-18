package com.challenge_java_angula.backend.app.entity.dto;


import com.challenge_java_angula.backend.app.entity.Admin;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantResponse {

    private Long plantId;

    private String plantName;

    private String readings;

    private String disabledSensors;

    private String avgAlerts;

    private String country;

    private String redAlerts;

    private String adminName;
}
