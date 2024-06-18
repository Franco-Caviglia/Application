package com.challenge_java_angula.backend.app.repository;

import com.challenge_java_angula.backend.app.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Long> {

    @Query(value = "SELECT p.* FROM plant p INNER JOIN admin a ON p.admin_id = a.admin_id" +
            " WHERE p.plant_id = :plantId && a.email = :emailAdmin", nativeQuery = true)
    Plant findByPlantIdAndAdmin(String emailAdmin, Long plantId);

    @Query(value = "SELECT p.* FROM plant p INNER JOIN admin a ON p.admin_id = a.admin_id " +
            "WHERE a.email = :emailAdmin", nativeQuery = true)
    List<Plant> findAllByAdmin(String emailAdmin);
}
