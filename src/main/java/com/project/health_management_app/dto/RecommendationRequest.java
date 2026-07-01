package com.project.health_management_app.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationRequest {
    private String userId;
    private String activityId;
    private List<String> improvements;
    private List<String> safety;
    private List<String> suggestions;

}
