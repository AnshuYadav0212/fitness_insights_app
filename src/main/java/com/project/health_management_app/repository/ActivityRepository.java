package com.project.health_management_app.repository;

import com.project.health_management_app.Model.Activity;
import com.project.health_management_app.dto.ActivityRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, String> {

    List<Activity> findByUserId(String userId);
}
