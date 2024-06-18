package com.challenge_java_angula.backend.app.service;

import com.challenge_java_angula.backend.app.entity.dto.PlantRequest;
import com.challenge_java_angula.backend.app.entity.dto.PlantResponse;
import com.challenge_java_angula.backend.validation.ValidationResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAppService {
    ValidationResponse addPlant(String emailAdmin, PlantRequest plantRequest);

    ValidationResponse editPlant(String emailAdmin, Long plantId,PlantResponse plantResponse);

    ValidationResponse delPlant(String admin, Long plantId);

    List<PlantResponse> getPlants(String emailAdmin);

    PlantResponse getInfoPlant(String admin, Long plantId);
}
