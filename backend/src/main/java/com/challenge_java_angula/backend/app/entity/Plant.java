package com.challenge_java_angula.backend.app.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "plant")
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "plant_id")
    private Long plantId;

    @JoinColumn(name = "plant_name")
    private String plantName;

    private String readings;

    @JoinColumn(name = "avg_alerts")
    private String avgAlerts;

    private String country;

    @JoinColumn(name = "disable_sensors")
    private String disabledSensors;

    @JoinColumn(name = "red_alerts")
    private String redAlerts;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
