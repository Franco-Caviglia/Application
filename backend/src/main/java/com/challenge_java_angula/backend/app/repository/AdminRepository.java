package com.challenge_java_angula.backend.app.repository;

import com.challenge_java_angula.backend.app.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminRepository  extends JpaRepository<Admin, Long> {

    @Query(value = "SELECT a.* FROM admin a WHERE a.email = :email", nativeQuery = true)
    Admin findByEmail(String email);
}
