package com.challenge_java_angula.backend.app.service;

import com.challenge_java_angula.backend.app.entity.Plant;
import com.challenge_java_angula.backend.app.entity.dto.PlantRequest;
import com.challenge_java_angula.backend.app.entity.dto.PlantResponse;
import com.challenge_java_angula.backend.app.repository.AdminRepository;
import com.challenge_java_angula.backend.app.repository.PlantRepository;
import com.challenge_java_angula.backend.validation.ValidationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppServiceImpl implements IAppService {

    private final AdminRepository adminRepository;
    private final PlantRepository plantRepository;


    @Override
    public ValidationResponse addPlant(String emailAdmin, PlantRequest plantRequest) {

        Plant plant = Plant.builder()
                .plantName(plantRequest.getPlantName())
                .avgAlerts(plantRequest.getAvgAlerts())
                .country(plantRequest.getCountry())
                .redAlerts(plantRequest.getRedAlerts())
                .readings(plantRequest.getReadings())
                .disabledSensors(plantRequest.getDisabledSensors())
                .admin(adminRepository.findByEmail(emailAdmin))
                .build();

        plantRepository.save(plant);
        return new ValidationResponse(0, "La planta fue registrada con éxito!");
    }

    @Override
    public ValidationResponse editPlant(String emailAdmin, Long plantId,PlantResponse plantResponse) {

        Plant plant = plantRepository.findByPlantIdAndAdmin(emailAdmin, plantId);

        if(plant != null){
            plant.setPlantName(plantResponse.getPlantName());
            plant.setCountry(plantResponse.getCountry());
            plant.setReadings(plantResponse.getReadings());
            plant.setAvgAlerts(plantResponse.getAvgAlerts());
            plant.setRedAlerts(plantResponse.getRedAlerts());
            plant.setDisabledSensors(plantResponse.getDisabledSensors());
        } else {
            return new ValidationResponse(1, "La planta no existe!");
        }

        plantRepository.save(plant);
        return new ValidationResponse(0, "La info de la planta fue actualizada!");
    }

    @Override
    public ValidationResponse delPlant(String emailAdmin, Long plantId) {

        Plant plant = plantRepository.findByPlantIdAndAdmin(emailAdmin, plantId);

        if(plant != null){
            plantRepository.delete(plant);
        } else {
            return new ValidationResponse(1, "La planta no existe!");
        }

        return new ValidationResponse(0, "La planta fue eliminada con éxito");
    }

    @Override
    public List<PlantResponse> getPlants(String emailAdmin) {

        List<Plant> plantList = plantRepository.findAllByAdmin(emailAdmin);

        List<PlantResponse> plantResponseList = new ArrayList<>();

        for(Plant plant: plantList){
            PlantResponse plantResponse = PlantResponse.builder()
                    .plantId(plant.getPlantId())
                    .plantName(plant.getPlantName())
                    .country(plant.getCountry())
                    .readings(plant.getReadings())
                    .disabledSensors(plant.getDisabledSensors())
                    .redAlerts(plant.getRedAlerts())
                    .avgAlerts(plant.getAvgAlerts())
                    .adminName(plant.getAdmin().getName())
                    .build();

            plantResponseList.add(plantResponse);
        }

        return plantResponseList;
    }


    @Override
    public PlantResponse getInfoPlant(String admin, Long plantId) {

        Plant plant = plantRepository.findByPlantIdAndAdmin(admin, plantId);


        return PlantResponse.builder()
                .plantId(plantId)
                .plantName(plant.getPlantName())
                .redAlerts(plant.getRedAlerts())
                .readings(plant.getReadings())
                .disabledSensors(plant.getDisabledSensors())
                .country(plant.getCountry())
                .avgAlerts(plant.getAvgAlerts())
                .build();
    }
}
